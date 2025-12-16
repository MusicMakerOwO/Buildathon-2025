const props = require('../build/Structures/GameObjects.js');
const {Key} = require("../build/Structures/Items.js");

const key = new Key();

for (const prop of Object.values(props)) {
	test(`${prop.name} has functional inventory`, () => {
		const propInstance = new prop(key);
		propInstance.addItem(key);
		expect(propInstance.contents[0]).toBe(key);
	});
}