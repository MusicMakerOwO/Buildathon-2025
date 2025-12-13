import {LOGS_PER_PAGE} from "./View";
import {ButtonHandler} from "../../Typings/HandlerTypes";

export default {
	customID: 'dungeon-scroll',
	async execute(interaction, client, args) {

		if (!interaction.replied && !interaction.deferred) {
			await interaction.deferUpdate();
		}

		const [scrollDirection, gameKey, action, obstacle] = args;

		const game = client.gameInstances.get( parseInt(gameKey) );
		if (!game) {
			await interaction.editReply({
				embeds: [{
					color: 0xFF0000,
					description: 'This game session has expired or does not exist.'
				}],
				components: []
			});
			return;
		}

		if (scrollDirection === 'up') {
			// scroll up by half a page
			game.logOffset += Math.ceil(LOGS_PER_PAGE / 2);
		} else if (scrollDirection === 'down') {
			// scroll down by half a page
			game.logOffset -= Math.ceil(LOGS_PER_PAGE / 2);
			if (game.logOffset < 0) game.logOffset = 0;
		}

		const dungeonView = client.buttons.get('dungeon-view')!;
		dungeonView.execute(interaction, client, [gameKey, action, obstacle]);
	}
} as ButtonHandler;