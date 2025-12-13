import {SelectMenuHandler} from '../Typings/HandlerTypes';
import {ButtonInteraction} from "discord.js";

export default {
	customID: 'dungeon-actionselect',
	execute: async function (interaction, client, [gamekey, object]) {
		const selectedAction = interaction.values[0];
		const dungeonView = client.buttons.get('dungeon-view')!;
		dungeonView.execute(interaction as unknown as ButtonInteraction, client, [gamekey, selectedAction, object]);
	}
} as SelectMenuHandler;