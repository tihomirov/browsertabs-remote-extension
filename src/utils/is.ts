export function isSomething<T>(x: T | undefined | null): x is NonNullable<T> { // eslint-disable-line @typescript-eslint/ban-types
	return x != null; // eslint-disable-line no-eq-null, eqeqeq
}
