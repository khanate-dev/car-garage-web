import fetchRequest from './fetch-request.helpers';

import { FetchBaseOptions } from 'types/fetch';

const deleteRequest = <Response extends Record<string, any>>(
	apiPath: string,
	noAuth?: FetchBaseOptions['noAuth']
) => fetchRequest<Response>(apiPath, {
	method: 'DELETE',
	noAuth,
});

export default deleteRequest;
