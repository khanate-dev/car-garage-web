import { LoaderFunction, useLoaderData } from 'react-router-dom';

import { BodyType } from 'schemas/body-type';
import { getBodyTypes } from 'endpoints/body-type';

import { humanizeString } from 'helpers/string';

import Page from 'components/Page';
import Card from 'components/Card';

export const bodyTypesViewLoader: LoaderFunction = getBodyTypes;

export const BodyTypesView = () => {

	const bodyTypes = useLoaderData() as BodyType[];

	return (
		<Page
			title='Body Types'
			isEmpty={bodyTypes.length === 0}
			hasAdd
			isGridView
		>
			{bodyTypes.map(({ _id, name, model }) =>
				<Card
					key={_id}
					title={name}
					labels={[
						{
							title: `Model: ${`${model.year} ${model.name}`}`,
							color: 'danger',
						},
						{
							title: `Make Type: ${humanizeString(model.makeType.name)}`,
							color: 'success',
						},
					]}
				/>
			)}
		</Page>
	);

};
