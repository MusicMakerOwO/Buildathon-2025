import {cpus} from "node:os";

export const ROOT_FOLDER = __dirname + '/..';

export const DB_SETUP_FILE = `${ROOT_FOLDER}/DB_SETUP.sql`;
export const DB_FILE = `${ROOT_FOLDER}/database.sqlite`;

export const SECONDS = {
	MINUTE: 60,
	HOUR: 	60 * 60,
	DAY: 	60 * 60 * 24,
	WEEK: 	60 * 60 * 24 * 7,
	MONTH: 	60 * 60 * 24 * 30,
	YEAR: 	60 * 60 * 24 * 365
} as const;

export const CORES_AVAILABLE = cpus().length;