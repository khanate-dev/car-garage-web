import ThemeSwitch from 'components/ThemeSwitch';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import styles from './error.module.scss';

export const Error = () => {

	const error = useRouteError();

	return (
		<div className={styles['container']}>

			<ThemeSwitch
				className={styles['theme-switch']}
			/>

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

		</div>
	);

};