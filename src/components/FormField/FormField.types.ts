import { ReactNode } from 'react';

import { FormField } from 'types/general';

export const formFieldSizes = [
	'tiny',
	'small',
	'medium',
	'large',
	'huge',
] as const;

export type FormFieldSize = typeof formFieldSizes[number];

export interface FormFieldProps<
	Form extends Record<string, any> = Record<string, any>
> {

	className?: string,

	field: FormField<Form>,

	/** validation errors against the field */
	error?: ReactNode,

	/** the size of the field. @default 'medium' */
	size?: FormFieldSize,

	/** the function to call to reset validation errors */
	onErrorReset?: () => void,

}