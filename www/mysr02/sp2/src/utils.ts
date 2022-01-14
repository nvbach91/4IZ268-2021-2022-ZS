export type PromiseDefer<T> = {
	promise: Promise<T>;
	resolve: (x: T | PromiseLike<T>) => void;
	reject: (x: unknown) => void;
};

export const defer = <T>(): PromiseDefer<T> => {
	const defer: Partial<PromiseDefer<T>> = {};
	defer.promise = new Promise<T>((res, rej) => {
		defer.resolve = res;
		defer.reject = rej;
	});

	return defer as PromiseDefer<T>;
};
