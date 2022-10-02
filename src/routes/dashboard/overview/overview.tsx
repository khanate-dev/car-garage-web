import { LoaderFunction } from 'react-router-dom';

import { getSetting } from 'helpers/settings';

import Page from 'components/Page';
import Card from 'components/Card';

import { ReactComponent as LogoutIcon } from 'icons/logout.svg';

import styles from './overview.module.scss';

export const overviewLoader: LoaderFunction = async () => {
	return {};
};

export const Overview = () => {

	const user = getSetting('user');

	return (
		<Page
			title='Overview'
			className={styles['container']}
		>
			<Card
				title='Car Garage'
				subtitle={`Welcome, ${user?.name.split(' ')[0]}`}
				description='You can see analytics and reports on this page'
				centered
			/>
			<Card
				title='Orders'
				details={[
					{ label: 'Open', value: '44' },
					{ label: 'Completed', value: '10' },
				]}
			/>
			<Card
				title='Orders'
				details={[
					{ label: 'Open', value: '44' },
					{ label: 'Completed', value: '10' },
				]}
			/>
			<Card
				title='Orders'
				details={[
					{ label: 'Open', value: '44' },
					{ label: 'Completed', value: '10' },
				]}
			/>
			<Card
				title='Orders'
				details={[
					{ label: 'Open', value: '44' },
					{ label: 'Completed', value: '10' },
				]}
			/>
			<Card
				title='Orders'
				details={[
					{ label: 'Open', value: '44' },
					{ label: 'Completed', value: '10' },
				]}
			/>
			<Card
				title='Orders'
				details={[
					{ label: 'Open', value: '44' },
					{ label: 'Completed', value: '10' },
				]}
			/>
		</Page>
	);

};