import { FormField, Size } from 'types/general';

export interface FormFieldProps<
	Form extends Record<string, any> = Record<string, any>
> {

	className?: string,

	field: FormField<Form>,

	/** validation errors against the field */
	error?: Error,

	/** the size of the field. @default 'medium' */
	size?: Size,

}