import { cx } from 'helpers/class-name';

import { PageProps } from './Page.types';
import styles from './Page.module.scss';
import Button from 'components/Button';
import { useNavigate, useNavigation } from 'react-router-dom';
import { ArrowLeftIcon as BackIcon, PlusIcon as AddIcon } from '@primer/octicons-react';

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
						icon={<AddIcon />}
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
						icon={<BackIcon />}
						onClick={() => navigate(-1)}
						isLoading={Boolean(location)}
					/>
				}

			</header>

			<div
				className={cx(
					styles['body'],
					isEmpty && styles['empty'],
					!isEmpty && isGridView && styles['grid'],
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