import {SelectMenuHandler} from '../Typings/HandlerTypes';
import {ButtonInteraction} from "discord.js";

export default {
	customID: 'dungeon-select-action',
	execute: async function (interaction, client, [gamekey, prop]) {
		const selectedAction = interaction.values[0];
		const dungeonView = client.buttons.get('dungeon-view')!;
		dungeonView.execute(interaction as unknown as ButtonInteraction, client, [gamekey, selectedAction, prop]);
	}
} as SelectMenuHandler;