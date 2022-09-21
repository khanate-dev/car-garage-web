import fetchRequest from './fetch-request.helpers';

import { FetchBaseOptions, FetchBodyOptions, GenericFetchResponse } from 'types/fetch';

const patchRequest = <Response = GenericFetchResponse>(
	apiPath: string,
	body: FetchBodyOptions['body'],
	noAuth?: FetchBaseOptions['noAuth']
) => fetchRequest<Response>(apiPath, {
	method: 'PATCH',
	body,
	noAuth,
});

export default patchRequest;