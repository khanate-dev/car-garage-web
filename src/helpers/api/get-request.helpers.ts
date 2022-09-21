import { FetchBaseOptions, GenericFetchResponse } from 'types/fetch';

import fetchRequest from './fetch-request.helpers';

const getRequest = <Response = GenericFetchResponse>(
	apiPath: string,
	noAuth?: FetchBaseOptions['noAuth']
) => fetchRequest<Response>(apiPath, {
	method: 'GET',
	noAuth,
});

export default getRequest;