import { ReactNode } from 'react';

import { FormField, Size } from 'types/general';

export interface FormFieldProps<
	Form extends Record<string, any> = Record<string, any>
> {

	className?: string,

	field: FormField<Form>,

	/** validation errors against the field */
	error?: ReactNode,

	/** the size of the field. @default 'medium' */
	size?: Size,

	/** the function to call to reset validation errors */
	onErrorReset?: () => void,

}