import {
	LoaderFunction,
	useLoaderData,
} from 'react-router-dom';

import { MakeType } from 'schemas/make-type';
import { getMakeTypes } from 'endpoints/make-type';

import Page from 'components/Page';
import Card from 'components/Card';

import styles from './make-types-view.module.scss';

export const makeTypesViewLoader: LoaderFunction = getMakeTypes;

export const MakeTypesView = () => {

	const makeTypes = useLoaderData() as MakeType[];

	return (
		<Page
			title='Make Types'
			isEmpty={makeTypes.length === 0}
			hasAdd
		>
			<div
				className={styles['grid']}
			>
				{makeTypes.map(({ _id, name }) =>
					<Card
						key={_id}
						title={name}
					/>
				)}
			</div>
		</Page>
	);

};