import fetchRequest from './fetch-request.helpers';

import { FetchBaseOptions, FetchBodyOptions, GenericFetchResponse } from 'types/fetch';

const postRequest = <Response = GenericFetchResponse>(
	apiPath: string,
	body: FetchBodyOptions['body'],
	noAuth?: FetchBaseOptions['noAuth']
) => fetchRequest<Response>(apiPath, {
	method: 'POST',
	body,
	noAuth,
});

export default postRequest;