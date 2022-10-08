import { useState } from 'react';
import {
	LoaderFunction,
	useLoaderData,
	useNavigate,
	useNavigation,
} from 'react-router-dom';

import { Model } from 'schemas/model';
import { getModels } from 'endpoints/model';

import { humanizeToken } from 'helpers/string';

import Page from 'components/Page';
import Card from 'components/Card';
import FormField from 'components/FormField';

export const modelsViewLoader: LoaderFunction = async () => {
	return await getModels();
};

export const ModelsView = () => {

	const models = useLoaderData() as Model[];
	const navigate = useNavigate();
	const navigation = useNavigation();

	const [makeTypeName, setMakeTypeName] = useState<'all' | string>('all');

	const visibleModels = models.filter(model =>
		makeTypeName === 'all'
		|| model.makeType.name === makeTypeName
	);

	return (
		<Page
			title='Models'
			isEmpty={models.length === 0}
			filters={
				<>
					<FormField
						field={{
							fieldType: 'select',
							name: 'makeType',
							options: [
								'all',
								...[...new Set(models.map(model => model.makeType.name).filter(Boolean))],
							],
							value: makeTypeName,
							onChange: ({ target }) => setMakeTypeName(target.value),
						}}
						size='tiny'
					/>
				</>
			}
			hasAdd
			isGridView
		>
			{visibleModels.map(({ _id, name, year, makeType }) =>
				<Card
					key={_id}
					title={`${year} ${name}`}
					labels={[{
						title: `Make Type: ${humanizeToken(makeType.name)}`,
						color: 'info',
					}]}
					actions={[{
						text: 'Update',
						icon: 'update',
						onClick: () => navigate(`update/${_id}`),
						isLoading: (
							navigation.state !== 'idle'
							&& navigation.location.pathname === `/models/update/${_id}`
						),
						fullWidth: true,
					}]}
				/>
			)}
		</Page>
	);

};
