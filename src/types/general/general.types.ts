import { UserSansPassword } from 'schemas/user';

export const themeColors = [
	'default',
	'primary',
	'secondary',
	'danger',
	'success',
	'info',
	'warning',
] as const;

export type ThemeColor = typeof themeColors[number];

export type ReadableTypeOf = (
	| 'undefined'
	| 'boolean'
	| 'number'
	| 'bigint'
	| 'string'
	| 'symbol'
	| 'function'
	| 'array'
	| 'null'
	| 'object'
);

export interface RepeatedTuple<L extends number, T extends any> extends Array<T> {
	0: T,
	length: L,
}

export type DistributedArray<T> = T extends infer I ? I[] : never;

export type GenericObject<Key extends string = string> = {
	[x in Key]: (
		string
		| number
		| boolean
		| Date
		| null
		| undefined
		| string[]
		| number[]
		| GenericObject[]
		| GenericObject
	);
};

export interface Sorting {
	column: string | null,
	direction: 'ascending' | 'descending',
}

export interface Settings {
	user: UserSansPassword,
	isDarkMode: boolean,
	accessToken: string,
	refreshToken: string,
}

export type AssertFunction<Type> = (
	value: any
) => asserts value is Type;

export type AssertArrayFunction<Type> = (
	value: any,
	onlyCheckFirst?: boolean
) => asserts value is Type;