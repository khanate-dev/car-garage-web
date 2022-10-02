import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import { invalidateUser } from 'helpers/events';

import Button from 'components/Button';

import { ReactComponent as LogoutIcon } from 'icons/logout.svg';

import styles from './error.module.scss';

export const ErrorBoundary = () => {

	const error = useRouteError();

	return (
		<div className={styles['container']}>

			<h1
				className={styles['heading']}
			>
				Oops!
			</h1>

			<p>Sorry, An Unexpected Error Has Occurred.</p>

			{isRouteErrorResponse(error) &&
				<>
					<h3>{error.status} - {error.statusText}</h3>
					{error.data?.message &&
						<code className={styles['error-message']}>
							{error.data.message}
						</code>
					}
				</>
			}

			{(error instanceof Error) &&
				<>
					<h3>{error.name}</h3>
					<code className={styles['error-message']}>
						{error.message}
					</code>
					{error.name === 'ApiAuthError' &&
						<Button
							icon={<LogoutIcon />}
							color='primary'
							variant='outline'
							text='Logout'
							onClick={invalidateUser}
						/>
					}
				</>
			}

		</div>
	);

};