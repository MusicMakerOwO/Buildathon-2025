import {ButtonInteraction, SlashCommandBuilder} from "discord.js";
import { GameController, THEMES } from "../Structures/GameController";
import { CommandHandler } from "../Typings/HandlerTypes";
import {ObjectValues} from "../Typings/Helpers";

export default {
	data: new SlashCommandBuilder()
	.setName('start-dungeon')
	.setDescription('Start a new adventure')
	.addStringOption(x => x
		.setName('theme')
		.setDescription('The theme of your dungeon adventure')
		.setRequired(true)
		.addChoices([
			{ name: 'Dungeon [Standard]', value: THEMES.Dungeon },
			{ name: 'Haunted House', value: THEMES.HauntedHouse },
			{ name: 'Abandoned Lab', value: THEMES.AbandonedLab },
			{ name: 'Snowy Cabin', value: THEMES.SnowyCabin }
		])
	),
	async execute(interaction, client) {
		const gameInstance = new GameController(
			interaction.options.getString('theme') as ObjectValues<typeof THEMES>,
			5 // default room count
		);
		const gameKey = Date.now();
		client.gameInstances.set(gameKey, {
			instance: gameInstance,
			guildID: interaction.guildId!,
			channelID: interaction.channelId,
			userID: interaction.user.id,
			logOffset: 0
		});

		await interaction.deferReply({ ephemeral: true });

		// start main game loop
		const viewButton = client.buttons.get('dungeon-view')!;
		viewButton.execute(interaction as unknown as ButtonInteraction, client, [gameKey.toString()]);
	}
} as CommandHandler;