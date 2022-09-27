import { ReactNode } from 'react';
import { ZodError } from 'zod';

import { readableTypeOf } from 'helpers/type';

import { FormFieldErrors } from './form.error.types';

class FormError<Form extends Record<string, any>> extends Error {

	fieldErrors: FormFieldErrors<Form> = {};

	generalError?: ReactNode;

	isGeneral: boolean = true;

	constructor(error: any) {

		const isGeneral = !(
			(
				error instanceof ZodError
				&& error.issues.every(issue =>
					issue.code !== 'custom'
					&& issue.path.length > 0
				)
			)
			|| (
				readableTypeOf(error) === 'object'
				&& !(error instanceof Error)
			)
		);

		const message = (
			isGeneral
				? (
					error instanceof ZodError
						? error.issues.map(issue => issue.message).join('\n')
						: error.message ?? JSON.stringify(error)
				)
				: 'some fields are invalid'
		);
		super(message);

		this.fieldErrors = (
			!isGeneral
				? error instanceof ZodError
					? (error).issues.reduce(
						(object, error) => ({
							...object,
							[error.path[0] as any]: error.message,
						})
						, {}
					)
					: error
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