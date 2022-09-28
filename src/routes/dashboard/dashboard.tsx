import Sidebar from 'components/Sidebar';
import styles from './dashboard.module.scss';

export const Dashboard = () => {

	return (
		<>

			<Sidebar />

			<main
				className={styles['main']}
			>

			</main>

		</>
	);

};