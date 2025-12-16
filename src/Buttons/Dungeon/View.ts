import {ButtonHandler} from "../../Typings/HandlerTypes";

export const LOGS_PER_PAGE = 10;

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

function Capitalize<S extends string>(str: S): Capitalize<S> {
	return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<S>;
}

export default {
	customID: 'dungeon-view',
	async execute(interaction, client, args) {

		if (!interaction.replied && !interaction.deferred) {
			await interaction.deferUpdate();
		}

		const gameKey = parseInt(args.shift()!);
		const game = client.gameInstances.get(gameKey);
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

		let action   = args[0] === 'null' ? null : Capitalize(args[0] || '');
		let propName = args[1] === 'null' ? null : Capitalize(args[1] || '');

		if (action === 'Inventory') {
			game.instance.addBlankLog();
			game.instance.interact('Inventory', '');

			// consume action after processing
			action = null;
		} else if (action && propName) {
			game.instance.addBlankLog();
			game.instance.interact(action, propName);
			// reset log offset to show latest logs
			game.logOffset = 0;

			// consume action and prop after processing
			action = null;
			propName = null;
		}

		const logsToDisplay = game.instance.logs.slice( - (game.logOffset + LOGS_PER_PAGE), - game.logOffset || undefined);
		const logMessage = logsToDisplay.length > 0 ? logsToDisplay.join('\n') : '[ SOMETHING WENT WRONG ]';

		// getter
		const availableActions = game.instance.availableActions;
		if (!availableActions) {
			// only returns null if game is over
			throw new Error('No available actions, is the game over?');
		}

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
					custom_id: `dungeon-scroll_up_${gameKey}_${action || ''}_${propName || ''}`,
					disabled: game.logOffset + LOGS_PER_PAGE >= game.instance.logs.length
				},
				{
					type: 2,
					style: 1,
					label: '⬇️ Scroll Down',
					custom_id: `dungeon-scroll_down_${gameKey}_${action || ''}_${propName || ''}`,
					disabled: game.logOffset === 0
				}
			]
		};

		const actionSelection = {
			type: 1,
			components: [
				{
					type: 3,
					custom_id: `dungeon-select-action_${gameKey}_${propName || ''}`,
					placeholder: 'Choose an action ...',
					options: [] as Array<{label: string, value: string}>,
					disabled: false
				}
			]
		};

		const objectSelection = {
			type: 1,
			components: [
				{
					type: 3,
					custom_id: `dungeon-select-prop_${gameKey}_${action || ''}`,
					placeholder: 'Choose an object ...',
					options: [] as Array<{label: string, value: string}>,
					disabled: false
				}
			]
		};

		const actionOptions = new Set<string>();
		const objectOptions = new Set<string>();
		for (const [action, propList] of Object.entries(availableActions)) {
			actionOptions.add(action);
			for (const prop of propList) {
				objectOptions.add(prop.name);
			}
		}

		actionSelection.components[0].options = Array.from(actionOptions).map(act => ({
			label: act,
			value: act
		}));
		objectSelection.components[0].options = Array.from(objectOptions).map(obj => ({
			label: obj,
			value: obj
		}));

		if (action || propName) {
			if (action) {
				actionSelection.components[0].placeholder = action;

				// only display objects that support the selected action
				const possibleObjects = availableActions[action] || [];
				objectSelection.components[0].options.length = 0; // clear existing options
				for (const obj of possibleObjects) {
					objectSelection.components[0].options.push({
						label: obj.name,
						value: obj.name
					});
				}
			}
			if (propName) {
				objectSelection.components[0].placeholder = propName;
				// only display actions that can be performed on the selected object
				const possibleActions = new Set<string>();
				for (const [act, propList] of Object.entries(availableActions)) {
					for (const prop of propList) {
						if (prop.name === propName) {
							possibleActions.add(act);
						}
					}
				}
				actionSelection.components[0].options.length = 0;
				for (const act of possibleActions) {
					actionSelection.components[0].options.push({
						label: act,
						value: act
					});
				}
			}

			if (actionSelection.components[0].options.length === 0) {
				actionSelection.components[0].placeholder = '[ NO ACTIONS AVAILABLE ]';
				actionSelection.components[0].options.push({
					label: '[ NO ACTIONS AVAILABLE ]',
					value: 'null'
				});
				actionSelection.components[0].disabled = true;
			}
			if (objectSelection.components[0].options.length === 0) {
				objectSelection.components[0].placeholder = '[ NO OBJECTS AVAILABLE ]';
				objectSelection.components[0].options.push({
					label: '[ NO OBJECTS AVAILABLE ]',
					value: 'null'
				});
				objectSelection.components[0].disabled = true;
			}
		}

		// check game state after processing
		if (game.instance.gameOver) {
			await interaction.editReply({
				embeds: [{
					title: 'Game Over',
					description: `
\`\`\`
${logMessage}
\`\`\`
					`.trim(),
					color: 0x00AAFF,
					footer: { text: 'Made with ❤️ by @musicmaker' }
				}],
				components: [buttons]
			});
		} else {
			await interaction.editReply({
				embeds: [embed],
				components: [buttons, actionSelection, objectSelection]
			});
		}
	}
} as ButtonHandler;