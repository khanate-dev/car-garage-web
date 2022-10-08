import fetchRequest from './fetch-request.helpers';

import { FetchBaseOptions, FetchBodyOptions } from 'types/fetch';

const putRequest = <Response extends Record<string, any>>(
	apiPath: string,
	body: FetchBodyOptions['body'],
	noAuth?: FetchBaseOptions['noAuth']
) => fetchRequest<Response>(apiPath, {
	method: 'PUT',
	body,
	noAuth,
});

export default putRequest;
