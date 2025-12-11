import { Client } from 'discord.js';
import {ButtonHandler, CommandHandler, ModalHandler, SelectMenuHandler} from "./Typings/HandlerTypes";
import config, {IConfig} from "./config";

interface IClient extends Client {
	config: IConfig;

	commands: Map<string, CommandHandler>;
	buttons: Map<string, ButtonHandler>;
	menus: Map<string, SelectMenuHandler>;
	modals: Map<string, ModalHandler>;
	context: Map<string, CommandHandler>;
}

const client = new Client({
	intents: [
		'Guilds'
	]
}) as IClient;

client.config = config;

export { client, IClient }