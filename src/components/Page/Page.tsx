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
					isEmpty && styles['empty'],
					className
				)}
			>
				{isEmpty
					? (
						<>
							<h1>Nothing to see here!</h1>
							<p>No {title} entries have been added yet</p>
						</>
					)
					: children
				}
			</div>
		</main>
	);

};

export default Page;