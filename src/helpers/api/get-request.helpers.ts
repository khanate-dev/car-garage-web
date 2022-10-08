import { ApiResponse, FetchBaseOptions } from 'types/fetch';

import fetchRequest from './fetch-request.helpers';

const getRequest = <Response extends ApiResponse>(
	apiPath: string,
	noAuth?: FetchBaseOptions['noAuth']
) => fetchRequest<Response>(apiPath, {
	method: 'GET',
	noAuth,
});

export default getRequest;
