import { ZodError } from 'zod';

import { readableTypeOf } from 'helpers/type';

import { FormFieldErrors } from './form.error.types';

class FormError<Form extends Record<string, any>> extends Error {

	/** the error on specific fields, if any */
	errors: null | FormFieldErrors<Form> = null;

	/** the type of form error */
	type: 'general' | 'field' | 'none' = 'none';

	constructor(error: any) {

		const type = (
			!error
				? 'none'
				: !(
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
				)
					? 'general'
					: 'field'
		);

		const message = (
			type === 'none'
				? null
				: type === 'general'
					? (
						error instanceof ZodError
							? error.issues.map(issue => issue.message).join('\n')
							: error.message ?? JSON.stringify(error)
					)
					: 'some fields are invalid'
		);
		super(message);
		if (type === 'none') return;

		this.errors = (
			type === 'field'
				? error instanceof ZodError
					? (error).issues.reduce(
						(object, error) => ({
							...object,
							[error.path[0] as any]: error,
						})
						, {}
					)
					: error
				: null
		);
		this.type = type;

	}

}

export default FormError;