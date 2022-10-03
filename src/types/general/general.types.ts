import {
	InputHTMLAttributes,
	ReactNode,
	SelectHTMLAttributes,
} from 'react';
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

export interface BaseFormField<Form extends Record<string, any>> {

	/** the name of the field */
	name: keyof Form,

	/** the type of the form element to use */
	fieldType?: 'input' | 'select',

	/** the label to show on the field */
	label?: ReactNode,

	/** additional information about the field */
	description?: ReactNode,

	/** checks if the field should be hidden? */
	getHidden?: (state: Form) => boolean,

}

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export interface InputFormField<
	Form extends Record<string, any>
> extends
	BaseFormField<Form>,
	Omit<InputProps, 'name'> {

	/** the type of the form element to use */
	fieldType: 'input',

}

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export type SelectOptions = string[] | {
	value: number | string,
	label: ReactNode,
}[];

export interface SelectFormField<
	Form extends Record<string, any>
> extends
	BaseFormField<Form>,
	Omit<SelectProps, 'name'> {

	/** the type of the form element to use */
	fieldType: 'select',

	/** the select fields allowed options */
	options: SelectOptions,

}

export type FormField<Form extends Record<string, any>> = (
	| InputFormField<Form>
	| SelectFormField<Form>
);

export const sizes = [
	'tiny',
	'small',
	'medium',
	'large',
	'huge',
] as const;

export type Size = typeof sizes[number];

const corners = [
	'flat',
	'rounded',
	'circular',
] as const;

export type Corner = typeof corners[number];

export interface ActionError {
	source: string,
	error: Error,
}