import { useActionData } from 'react-router-dom';

import FormError from 'errors/form';

import { ActionError, FormField } from 'types/general';

const useFormError = <
	Form extends Record<string, any>
>(
	source: string,
	fields: FormField<Form>[]
): FormError<Form> => {
	const actionError = useActionData() as ActionError;
	return new FormError<Form>(
		fields,
		actionError?.source === source
			? actionError.error
			: null
	);
};

export default useFormError;
