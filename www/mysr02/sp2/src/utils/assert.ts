export function assertNotNull<T>(value: T): asserts value is (T extends null ? never : T) {
	if (value === null) {
		throw new TypeError('Value must not be null');
	}
}

export function assertNotUndefined<T>(value: T): asserts value is (T extends undefined ? never : T) {
	if (value === undefined) {
		throw new TypeError('Value must not be undefined');
	}
}
