/**
 * Generates a random integer between min and max (inclusive).
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
module.exports = function RandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}