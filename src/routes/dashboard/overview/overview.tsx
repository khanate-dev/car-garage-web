import { LoaderFunction } from 'react-router-dom';

import Page from 'components/Page';
import Card from 'components/Card';

import styles from './overview.module.scss';

export const overviewLoader: LoaderFunction = async () => {
	return {};
};

export const Overview = () => {

	return (
		<Page
			title='Overview'
			className={styles['container']}
		>
			<Card
				title='Car Garage'
				subtitle='You can see analytics and reports on this page'
				isCentered
			/>
			<Card
				title='Orders'
				content={[
					{ label: 'Open', value: '44' },
					{ label: 'Completed', value: '10' },
				]}
			/>
			<Card
				title='Orders'
				content={[
					{ label: 'Open', value: '44' },
					{ label: 'Completed', value: '10' },
				]}
			/>
			<Card
				title='Orders'
				content={[
					{ label: 'Open', value: '44' },
					{ label: 'Completed', value: '10' },
				]}
			/>
			<Card
				title='Orders'
				content={[
					{ label: 'Open', value: '44' },
					{ label: 'Completed', value: '10' },
				]}
			/>
			<Card
				title='Orders'
				content={[
					{ label: 'Open', value: '44' },
					{ label: 'Completed', value: '10' },
				]}
			/>
			<Card
				title='Orders'
				content={[
					{ label: 'Open', value: '44' },
					{ label: 'Completed', value: '10' },
				]}
			/>
		</Page>
	);

};