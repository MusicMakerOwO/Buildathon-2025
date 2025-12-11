import {SlashCommandBuilder} from "discord.js";
import {CommandHandler} from "../Typings/HandlerTypes";

export default {
	alias: 'pong',
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong!'),
	autocomplete: async function(interaction, client) {
		// this is optional, called on any autocomplete stuff
	},
	execute: async function(interaction, client) {
		await interaction.reply('Pong!');
	}
} as CommandHandler;