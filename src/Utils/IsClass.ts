export function IsClass(value: unknown) {
	return typeof value === 'function' && /^class\s/.test(Function.prototype.toString.call(value));
}