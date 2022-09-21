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

export const userTypes = [
	'Administrator',
	'Supervisor',
	'Worker',
] as const;

export type UserType = typeof userTypes[number];

export interface User {
	UserID: number,
	UserName: string,
	UserType: UserType,
	LineID?: number,
	SectionID?: number,
	UserImageUrl?: string,
	UserThumbnailUrl?: string,
	CreatedAt?: string,
	UpdatedAt?: string,
	token: string,
}

export interface UserWithPassword extends User {
	Password: string,
}

export interface Settings {
	user: User,
	isDarkMode: boolean,
}

export type AssertFunction<Type> = (
	value: any
) => asserts value is Type;

export type AssertArrayFunction<Type> = (
	value: any,
	onlyCheckFirst?: boolean
) => asserts value is Type;