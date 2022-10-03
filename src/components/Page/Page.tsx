import { cx } from 'helpers/class-name';

import { PageProps } from './Page.types';
import styles from './Page.module.scss';
import Button from 'components/Button';
import { useNavigate, useNavigation } from 'react-router-dom';

const Page = ({
	title,
	className,
	isEmpty,
	isGridView,
	hasAdd,
	hasBack,
	children,
}: PageProps) => {

	const navigate = useNavigate();
	const { location } = useNavigation();

	return (
		<main
			className={styles['main']}
		>

			<header
				className={styles['header']}
			>

				<h1>{title}</h1>

				{hasAdd &&
					<Button
						variant='outline'
						color='primary'
						text='Add New'
						size='small'
						onClick={() => navigate('add')}
						isLoading={Boolean(location)}
					/>
				}

				{hasBack &&
					<Button
						variant='outline'
						color='primary'
						text='Back'
						size='small'
						onClick={() => navigate(-1)}
						isLoading={Boolean(location)}
					/>
				}

			</header>

			<div
				className={cx(
					styles['body'],
					isEmpty && styles['empty'],
					isGridView && styles['grid'],
					className
				)}
			>
				{isEmpty
					? <>
						<h1>Nothing to see here!</h1>
						<p>No {title} have been added yet</p>
					</>
					: children
				}
			</div>

		</main>
	);

};

export default Page;