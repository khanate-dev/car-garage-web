import fetchRequest from './fetch-request.helpers';

import { FetchBaseOptions, FetchBodyOptions } from 'types/fetch';

const postRequest = <Response extends Record<string, any>>(
	apiPath: string,
	body: FetchBodyOptions['body'],
	noAuth?: FetchBaseOptions['noAuth']
) => fetchRequest<Response>(apiPath, {
	method: 'POST',
	body,
	noAuth,
});

export default postRequest;
