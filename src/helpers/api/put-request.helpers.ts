import fetchRequest from './fetch-request.helpers';

import { FetchBaseOptions, FetchBodyOptions, GenericFetchResponse } from 'types/fetch';

const putRequest = <Response = GenericFetchResponse>(
	apiPath: string,
	body: FetchBodyOptions['body'],
	noAuth?: FetchBaseOptions['noAuth']
) => fetchRequest<Response>(apiPath, {
	method: 'PUT',
	body,
	noAuth,
});

export default putRequest;