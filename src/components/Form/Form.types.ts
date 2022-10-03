import { ReactElement, ReactNode } from 'react';
import { FormProps as RouterFormProps } from 'react-router-dom';

import { FormField } from 'types/general';

export interface FormProps<
	Type extends Record<string, any> = Record<string, any>
> extends Omit<RouterFormProps, 'title'> {

	/** the class name to pass to the form container */
	className?: string,

	/** the name of the form's page */
	page: string,

	/** the title to show on top of the form */
	title?: ReactNode,

	/** the subtitle to show on the form */
	subtitle?: ReactNode,

	/** the array of form fields to render */
	fields: FormField<Type>[],

	/** the footer to show on form's bottom */
	footer?: ReactElement,

	/** should the form be in a single column */
	noGrid?: boolean,

}