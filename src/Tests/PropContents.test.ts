import {test, expect} from "@jest/globals";
import {Key} from "../Structures/Items";
import * as props from "../Structures/GameObjects";

const key = new Key();

for (const prop of Object.values(props)) {
	test(`${prop.name} has functional inventory`, () => {
		const propInstance = new prop(false);
		propInstance.addItem(key);
		expect(propInstance.contents[0]).toBe(key);
	});
}