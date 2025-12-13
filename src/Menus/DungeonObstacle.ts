import { SelectMenuHandler } from '../Typings/HandlerTypes';
import {ButtonInteraction} from "discord.js";

export default {
	customID: 'dungeon-obstacleselect',
	execute: async function (interaction, client, [gamekey, action]) {
		const selectedObstacle = interaction.values[0];
		const dungeonView = client.buttons.get('dungeon-view')!;
		dungeonView.execute(interaction as unknown as ButtonInteraction, client, [gamekey, action, selectedObstacle]);
	}
} as SelectMenuHandler;