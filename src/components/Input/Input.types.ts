import { InputHTMLAttributes, ReactNode } from 'react';

export const inputSizes = [
	'tiny',
	'small',
	'medium',
	'large',
	'huge',
] as const;

export type InputSize = typeof inputSizes[number];


export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {

	/** the label to show on the input */
	label?: ReactNode,

	/** the name of the input field */
	name: string,

	/** additional information about the field */
	description?: ReactNode,

	/** validation errors against the input */
	error?: ReactNode,

	/** the size of the input field. @default 'medium' */
	size?: InputSize,

	/** the function to call to reset validation errors */
	onErrorReset?: () => void,

}