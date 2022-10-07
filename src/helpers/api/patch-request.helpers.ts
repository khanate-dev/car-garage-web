import fetchRequest from './fetch-request.helpers';

import { FetchBaseOptions, FetchBodyOptions } from 'types/fetch';

const patchRequest = <Response extends Record<string, any>>(
	apiPath: string,
	body: FetchBodyOptions['body'],
	noAuth?: FetchBaseOptions['noAuth']
) => fetchRequest<Response>(apiPath, {
	method: 'PATCH',
	body,
	noAuth,
});

export default patchRequest;
