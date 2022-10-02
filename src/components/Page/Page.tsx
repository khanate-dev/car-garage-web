import { cx } from 'helpers/class-name';

import { PageProps } from './Page.types';
import styles from './Page.module.scss';

const Page = ({
	title,
	className,
	isEmpty,
	children,
}: PageProps) => {

	return (
		<main
			className={styles['main']}
		>
			<h1>{title}</h1>
			<div
				className={cx(
					styles['body'],
					className
				)}
			>
				{children}
				{isEmpty &&
					<div className={styles['empty']}>
						<h1>Nothing to see here!</h1>
						<p>No {title} entries have been added yet</p>
					</div>
				}
			</div>
		</main>
	);

};

export default Page;