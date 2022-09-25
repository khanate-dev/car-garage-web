import { ReactNode } from 'react';
import { ZodError } from 'zod';

import { FormFieldErrors } from './form.error.types';

class FormError<Form extends Record<string, any>> extends Error {

	fieldErrors: FormFieldErrors<Form> = {};

	generalError?: ReactNode;

	isGeneral: boolean = true;

	constructor(error: any) {

		const isGeneral = !(error instanceof ZodError);

		const message = (
			isGeneral
				? error.message ?? JSON.stringify(error)
				: 'some fields are invalid'
		);
		super(message);

		this.fieldErrors = (
			!isGeneral
				? (error).issues.reduce(
					(object, error) => ({
						...object,
						[error.path[0] as any]: error.message,
					})
					, {}
				)
				: {}
		);
		this.generalError = (
			isGeneral
				? message
				: undefined
		);
		this.isGeneral = isGeneral;

	}

}

export default FormError;