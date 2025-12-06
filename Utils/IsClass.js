module.exports = function IsClass(value) {
	return typeof value === 'function' && /^class\s/.test(Function.prototype.toString.call(value));
}