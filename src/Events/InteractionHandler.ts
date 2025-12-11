import {ParseError} from '../Utils/FindError';
import {IClient} from "../Client";
import {Interaction} from "discord.js";
import {Log} from "../Utils/Log";
import {InteractionType} from "discord-api-types/v10";

import config from '../config';
import {ButtonHandler, CommandHandler, EventHandler, ModalHandler, SelectMenuHandler} from "../Typings/HandlerTypes";

export default {
	name: 'interactionCreate',
	execute: async function (client: IClient, interaction: Interaction) {

		switch (interaction.type) {
			case 4: // Autocomplete
			case 2: // Slash Commands + Context Menus
				if (interaction.commandType === 1) {
					// @ts-ignore
					const subcommand: string = interaction.options._subcommand || "";
					// @ts-ignore
					const subcommandGroup: string = interaction.options._subcommandGroup || "";
					// @ts-ignore
					const commandArgs: { value: string }[] = interaction.options._hoistedOptions || [];
					const args = `${subcommandGroup} ${subcommand} ${commandArgs.map(arg => arg.value).join(" ")}`.trim();
					Log('INFO', `${interaction.user.tag} (${interaction.user.id}) > /${interaction.commandName} ${args}`);
					InteractionHandler<CommandHandler>(client, interaction, 'commands', client.commands);
				} else {
					Log('INFO', `${interaction.user.tag} (${interaction.user.id}) > :${interaction.commandName}:`);
					InteractionHandler<CommandHandler>(client, interaction, 'context', client.context);
				}
				break;
			case 3: // Message Components
				if (interaction.isButton()) {
					Log('INFO', `${interaction.user.tag} (${interaction.user.id}) > [${interaction.customId}]`);
					InteractionHandler<ButtonHandler>(client, interaction, 'buttons', client.buttons);
				} else if (interaction.isAnySelectMenu()) {
					Log('INFO', `${interaction.user.tag} (${interaction.user.id}) > <${interaction.customId}>`);
					InteractionHandler<SelectMenuHandler>(client, interaction, 'menus', client.menus);
				}
				break;
			case 5: // Modal submit
				Log('INFO', `${interaction.user.tag} (${interaction.user.id}) > {${interaction.customId}}`);
				InteractionHandler<ModalHandler>(client, interaction, 'modals', client.modals);
				break;
			default:
				Log('ERROR', `Unknown interaction type: ${interaction.type} - Unsure how to handle this...`);
				break;
		}
	}
} as EventHandler;

async function InteractionHandler<HandlerType extends CommandHandler | ButtonHandler | ModalHandler | SelectMenuHandler>(client: IClient, interaction: Interaction, type: string, cache: Map<string, any>) {

	// @ts-ignore
	const args: string[] = interaction.customId?.split("_") ?? [];
	// @ts-ignore
	const name: string = args.shift() ?? interaction.commandName;

	const component = cache.get(name) as HandlerType | undefined;
	if (!component) {
		if (interaction.type === InteractionType.ApplicationCommandAutocomplete) {
			throw new Error('Command not found');
		}
		await interaction.reply({
			content: `There was an error while executing this command!\n\`\`\`Command not found\`\`\``,
			ephemeral: true
		}).catch(() => { });
		Log('ERROR', `${type} not found: ${name}`);
		return;
	}

	try {
		const callback = interaction.isAutocomplete() ? (component as CommandHandler).autocomplete : component.execute;
		if (typeof callback !== 'function') throw new Error('Command not implemented');
		// @ts-ignore - Complaining that Interaction is not assignable to more specific types, but it really does not matter in this case lmao
		await callback(interaction, client, type === 'commands' ? undefined : args);
	} catch (error) {
		Log('ERROR', error);

		if (interaction.type === InteractionType.ApplicationCommandAutocomplete) {
			return;
		}

		await interaction.deferReply({ ephemeral: true }).catch(() => {});

		if (!config.FANCY_ERRORS || !(error instanceof Error)) {
			await interaction.editReply({
				content: `There was an error while executing this command!\n\`\`\`${error}\`\`\``,
				embeds: [],
				components: [],
				files: [],
			}).catch(() => {});
		} else {
			const errorData = ParseError(error);
			if (errorData) {
				const embed = {
					color: 0xFF0000,
					description: `
	Command: \`${name}\`
	Error: \`${errorData.message}\`
	\`\`\`\n${errorData.lines.join('\n')}\`\`\``,
				}
				await interaction.editReply({
					content: '',
					embeds: [embed],
					components: [],
					files: [],
				}).catch(() => {});
				return;
			}
		}
	}
}