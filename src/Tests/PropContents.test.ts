import {test, expect} from "@jest/globals";
import {Key} from "../Structures/Items";
import * as props from "../Structures/GameObjects";

const key = new Key();

for (const prop of Object.values(props)) {
	const propInstance = new prop(false);
	if (propInstance.canHoldItems) {
		test(`${prop.name} has functional inventory`, () => {
			propInstance.addItem(key);
			expect(propInstance.contents[0]).toBe(key);
		});
	} else {
		test(`${prop.name} cannot hold items`, () => {
			expect(() => propInstance.addItem(key)).toThrow();
		});
	}
}