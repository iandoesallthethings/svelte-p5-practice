export function round(num, digits) {
	const factor = Math.pow(10, digits)
	return Math.round(num * factor + Number.EPSILON) / factor
}
