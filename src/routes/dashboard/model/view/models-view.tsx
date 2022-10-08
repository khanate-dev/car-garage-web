import { LoaderFunction, useLoaderData, useNavigate, useNavigation } from 'react-router-dom';

import { Model } from 'schemas/model';
import { getModels } from 'endpoints/model';

import { humanizeToken } from 'helpers/string';

import Page from 'components/Page';
import Card from 'components/Card';

export const modelsViewLoader: LoaderFunction = async () => {
	return await getModels();
};

export const ModelsView = () => {

	const models = useLoaderData() as Model[];
	const navigate = useNavigate();
	const navigation = useNavigation();

	return (
		<Page
			title='Models'
			isEmpty={models.length === 0}
			hasAdd
			isGridView
		>
			{models.map(({ _id, name, year, makeType }) =>
				<Card
					key={_id}
					title={`${year} ${name}`}
					labels={[{
						title: `Make Type: ${humanizeToken(makeType.name)}`,
						color: 'info',
					}]}
					actions={[{
						text: 'Update',
						icon: 'edit',
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
