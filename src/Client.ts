import { Client } from 'discord.js';
import {ButtonHandler, CommandHandler, ModalHandler, SelectMenuHandler} from "./Typings/HandlerTypes";
import config, {IConfig} from "./config";
import {GameController} from "./Structures/GameController";

interface IClient extends Client {
	config: IConfig;

	commands: Map<string, CommandHandler>;
	buttons: Map<string, ButtonHandler>;
	menus: Map<string, SelectMenuHandler>;
	modals: Map<string, ModalHandler>;
	context: Map<string, CommandHandler>;

	gameInstances: Map<number, {
		instance: GameController;

		// basic identifiers
		guildID: string;
		channelID: string;
		userID: string;

		// external metadata
		/**
		 * The number of logs to scroll up when displaying the game log
		 */
		logOffset: number;
	}>; // Date.now() -> GameController instance
}

const client = new Client({
	intents: [
		'Guilds'
	]
}) as IClient;

client.config = config;
client.gameInstances = new Map();

export { client, IClient }