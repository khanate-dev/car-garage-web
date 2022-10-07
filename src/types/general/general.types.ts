import {
	InputHTMLAttributes,
	ReactNode,
	SelectHTMLAttributes,
	TextareaHTMLAttributes,
} from 'react';
import { LoaderFunctionArgs, RouteObject } from 'react-router-dom';
import { Icon } from '@primer/octicons-react';

import { UserSansPassword } from 'schemas/user';

import { InteractiveRatingProps } from 'components/Rating';

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
	fieldType?: 'input' | 'select' | 'rating' | 'textarea',

	/** the label to show on the field */
	label?: ReactNode,

	/** additional information about the field */
	description?: ReactNode,

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
	options?: SelectOptions,

}

export interface RatingFormField<
	Form extends Record<string, any>
> extends
	BaseFormField<Form>,
	Omit<InteractiveRatingProps, 'name'> {

	/** the type of the form element to use */
	fieldType: 'rating',

}

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface TextareaFormField<
	Form extends Record<string, any>
> extends
	BaseFormField<Form>,
	Omit<TextareaProps, 'name'> {

	/** the type of the form element to use */
	fieldType: 'textarea',

}

export type FormField<Form extends Record<string, any>> = (
	| InputFormField<Form>
	| SelectFormField<Form>
	| RatingFormField<Form>
	| TextareaFormField<Form>
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

export interface DashboardRoute extends RouteObject {

	/** the route path  */
	path: string,

	/** the label to show for the route in the sidebar */
	label: string,

	/** the icon to use for the route in the sidebar */
	icon: Icon,

}

export enum Rating {
	One = 1,
	Two = 2,
	Three = 3,
	Four = 4,
	Five = 5,
}

export const ratings = [
	1, 2, 3, 4, 5,
] as Rating[];

export type FormLoaderData<
	Form extends Record<string, any> = Record<never, never>,
	Data extends Record<string, any> = Record<never, never>
> = Record<
	keyof Form,
	{
		options?: SelectOptions,
		value?: Form[keyof Form],
	}
> & Data;

export type FormLoader<
	Form extends Record<string, any> = Record<never, never>,
	Data extends Record<string, any> = Record<never, never>
> = (args: LoaderFunctionArgs) => Promise<FormLoaderData<Form, Data>>;
