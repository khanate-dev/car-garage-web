import {
	ReadableTypeOf,
	AssertFunction,
	AssertArrayFunction,
} from 'types/general';

const readableTypeOf = (
	value: any
): ReadableTypeOf => (
	typeof value !== 'object'
		? typeof value
		: value === null
			? 'null'
			: Array.isArray(value)
				? 'array'
				: 'object'
);

const isObject = (
	value: any
): value is Record<string, any> => (
	readableTypeOf(value) === 'object'
);

const assertObject: AssertFunction<Record<string, any>> = (value) => {
	const type = readableTypeOf(value);
	if (type !== 'object') {
		throw new TypeError(`Expected object, received ${type}`);
	}
};

const isString = (
	value: any
): value is string => (
	typeof value === 'string'
);

const assertString: AssertFunction<string> = (value) => {
	const type = readableTypeOf(value);
	if (type !== 'string') {
		throw new TypeError(`Expected string, received ${type}`);
	}
};

const isArrayByChecker = <Type>(
	value: any,
	checker: (value: any) => value is Type,
	onlyCheckFirst?: boolean
): value is Type[] => (
	Array.isArray(value)
	&& (
		onlyCheckFirst
			? value.length === 0 || checker(value[0])
			: value.every(element => checker(element))
	)
);

type AssertArrayByChecker = <Type>(
	value: any,
	assert: AssertFunction<Type>,
	onlyCheckFirst?: boolean
) => asserts value is Type[];

const assertArrayByChecker: AssertArrayByChecker = (
	value,
	assert,
	onlyCheckFirst
) => {
	if (!Array.isArray(value)) {
		const type = readableTypeOf(value);
		throw new TypeError(`Expected array, received ${type}`);
	}
	try {
		if (!value.length) return;
		const array = (
			onlyCheckFirst
				? value.slice(0, 1)
				: value
		);
		array.every(assert);
	}
	catch (error: any) {
		throw new TypeError(`Invalid array member. ${error.message ?? error}`);
	}
};

const isObjectArray = (
	value: any,
	onlyCheckFirst?: boolean
): value is Record<string, any>[] => (
	isArrayByChecker(value, isObject, onlyCheckFirst)
);

const assertObjectArray: AssertArrayFunction<Record<string, any>[]> = (
	value,
	onlyCheckFirst?
) => (
	assertArrayByChecker(value, assertObject, onlyCheckFirst)
);

const isStringArray = (
	value: any,
	onlyCheckFirst?: boolean
): value is string[] => (
	isArrayByChecker(value, isString, onlyCheckFirst)
);

const assertStringArray: AssertArrayFunction<string[]> = (
	value,
	onlyCheckFirst?
) => (
	assertArrayByChecker(value, assertString, onlyCheckFirst)
);

const areObjectArrays = (
	value: any,
	onlyCheckFirst?: boolean
): value is Record<string, any>[][] => (
	isArrayByChecker(value, isObjectArray, onlyCheckFirst)
);

const assertObjectArrays: AssertArrayFunction<Record<string, any>[][]> = (
	value,
	onlyCheckFirst
) => (
	assertArrayByChecker(value, assertObjectArray, onlyCheckFirst)
);

const areStringArrays = (
	value: any,
	isSingleType?: boolean
): value is string[][] => (
	isArrayByChecker(value, isStringArray, isSingleType)
);
const assertStringArrays: AssertArrayFunction<string[][]> = (
	value,
	onlyCheckFirst?
) => (
	assertArrayByChecker(value, assertStringArray, onlyCheckFirst)
);

export {
	readableTypeOf,
	isObject,
	assertObject,
	isString,
	assertString,
	isObjectArray,
	assertObjectArray,
	isStringArray,
	assertStringArray,
	areObjectArrays,
	assertObjectArrays,
	areStringArrays,
	assertStringArrays,
};
