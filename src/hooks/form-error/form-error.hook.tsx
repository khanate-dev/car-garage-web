import { useActionData } from 'react-router-dom';

import FormError from 'errors/form';

import { ActionError } from 'types/general';

const useFormError = <
	Form extends Record<string, any>
>(
	source: string
): FormError<Form> => {
	const actionError = useActionData() as ActionError;
	return new FormError<Form>(
		actionError?.source === source
			? actionError.error
			: null
	);
};

export default useFormError;