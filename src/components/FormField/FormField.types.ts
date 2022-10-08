import { FormField, Size } from 'types/general';

export interface FormFieldProps<
	Form extends Record<string, any> = Record<string, any>
> {

	/** the style class to apply to the container */
	className?: string,

	/** the details of the current form field */
	field: FormField<Form>,

	/** validation errors against the field */
	error?: Error,

	/** the size of the field. @default 'medium' */
	size?: Size,

	/** should the field be disabled? */
	disabled?: boolean,

}
