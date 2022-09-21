import fetchRequest from './fetch-request.helpers';

import { FetchBaseOptions, GenericFetchResponse } from 'types/fetch';

const deleteRequest = <Response = GenericFetchResponse>(
	apiPath: string,
	noAuth?: FetchBaseOptions['noAuth']
) => fetchRequest<Response>(apiPath, {
	method: 'DELETE',
	noAuth,
});

export default deleteRequest;