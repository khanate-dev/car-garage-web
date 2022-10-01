import { cx } from 'helpers/class-name';

import { PageProps } from './Page.types';
import styles from './Page.module.scss';

const Page = ({
	title,
	className,
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
			</div>
		</main>
	);

};

export default Page;