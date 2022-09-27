import { useReducer } from 'react';

import FormError from 'errors/form';

type Action<Form extends Record<string, any>> = (
	| { type: 'reset', }
	| { type: 'remove-field', value: (keyof Form) | (keyof Form)[], }
	| { type: 'update', value: FormError<Form>, }
);
const reducer = <Form extends Record<string, any>>(
	prev: null | FormError<Form>,
	action: Action<Form>
): null | FormError<Form> => {
	switch (action.type) {
		case 'remove-field': {
			if (!prev) return null;
			const fieldsToRemove = (
				Array.isArray(action.value)
					? action.value
					: [action.value]
			);
			fieldsToRemove.forEach(field =>
				delete prev.fieldErrors[field]
			);
			return new FormError(prev.fieldErrors);
		}
		case 'update':
			return action.value;
		case 'reset':
			return null;
		default:
			throw new Error('Invalid action type');
	}
};

const useFormError = <Form extends Record<string, any>>() => {
	return useReducer(reducer<Form>, null);
};

export default useFormError;