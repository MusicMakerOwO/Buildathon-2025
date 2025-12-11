import {ButtonHandler} from "../../Typings/HandlerTypes";

const LOGS_PER_PAGE = 10;

/*
World interactions will be a little weird since we have to manage everything through buttons and select menus.
Each time the user makes a selection, we are forced to re-render the entire game view with updated info.
This means we have to get creative with how we display information and options to the user.

[Game View] --> [Action Select] --> [Object Select]
     |                				                \
     |                                                [Game Update] --> [Game View] (repeat)
     v                                               /
[Object Select] --> [Action Select] ----------------/

It's a little hard to make out in ASCII art but in essence the [Action Select] and [Object Select] components
must be a no-op UNLESS both an action and an object have been selected, at which point we process the [Game Update]
and re-render the [Game View] with updated information.

Needless to say, this is VERY difficult from Discord's interaction model since we have to keep track of state
externally and re-render everything on each interaction. But it is doable with some careful planning.

One idea I have is to make different "views" of the game state that will look the same but internally are completely.
The [Game View] will be the main view with logs and options, while the [Action Select] and [Object Select] will contain their respective
selections but will re-render the [Game View] on selection change.

Upon clicking [Action Select] it will set the `placeholder` on it's select menu to give the illusion of selection,
but a user can still technically change it again before submitting the final action. However, this is not a normal [Game View]
because the moment you select an object it will run the game update and re-render the main [Game View].

[Game View] ---> User selects action ---> [Game View (with action selected)] ---> User selects object ---> [Game Update] ---> [Game View (updated)]
[Game View] ---> User selects object ---> [Game View (with object selected)] ---> User selects action ---> [Game Update] ---> [Game View (updated)]

This means that both the [Action Select] and [Object Select] views are ephemeral in nature and only exist to capture
user input before re-rendering the main [Game View]. Hope this clears it up, this is kind of tricky to explain in text.
 */

export default {
	customID: 'dungeon-view',
	async execute(interaction, client, args) {

		if (!interaction.replied && !interaction.deferred) {
			await interaction.deferUpdate();
		}

		const gameKey = parseInt(args[0]);
		const game = client.gameInstances.get(gameKey);
		if (!game) {
			await interaction.editReply({ content: 'This game session has expired or does not exist.' });
			return;
		}

		const logsToDisplay = game.instance.logs.slice( - (game.logOffset + LOGS_PER_PAGE), - game.logOffset || undefined);

		const logMessage = logsToDisplay.length > 0 ? logsToDisplay.join('\n') : '[ SOMETHING WENT WRONG ]';

		console.log(game.instance);

		const embed = {
			title: 'Game Log',
			description: `
\`\`\`
${logMessage}
\`\`\`
			`.trim(),
			color: 0x00AAFF
		}

		const buttons = {
			type: 1,
			components: [
				{
					type: 2,
					style: 1,
					label: '⬆️ Scroll Up',
					custom_id: `dungeon-scrollup_${gameKey}`,
					disabled: game.logOffset + LOGS_PER_PAGE >= game.instance.logs.length
				},
				{
					type: 2,
					style: 1,
					label: '⬇️ Scroll Down',
					custom_id: `dungeon-scrolldown_${gameKey}`,
					disabled: game.logOffset === 0
				}
			]
		};

		const actionSelection = {
			type: 1,
			components: [
				{
					type: 3,
					custom_id: `dungeon-actionselect_${gameKey}`,
					placeholder: 'Choose an action ...',
					options: game.instance.currentRoom.listAvailableActions().map(action => ({
						label: action.charAt(0).toUpperCase() + action.slice(1),
						value: action
					}))
				}
			]
		};

		const objectSelection = {
			type: 1,
			components: [
				{
					type: 3,
					custom_id: `dungeon-obstacleselect_${gameKey}`,
					placeholder: 'Choose an object ...',
					options: game.instance.currentRoom.listObstacles().map(prop => ({
						label: prop.charAt(0).toUpperCase() + prop.slice(1),
						value: prop
					}))
				}
			]
		};

		await interaction.editReply({
			embeds: [embed],
			components: [buttons, actionSelection, objectSelection]
		});
	}
} as ButtonHandler;