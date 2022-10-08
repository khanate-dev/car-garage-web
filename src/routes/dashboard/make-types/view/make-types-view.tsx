import {
	LoaderFunction,
	useLoaderData,
	useNavigate,
	useNavigation,
} from 'react-router-dom';

import { MakeType } from 'schemas/make-type';
import { getMakeTypes } from 'endpoints/make-type';

import Page from 'components/Page';
import Card from 'components/Card';

export const makeTypesViewLoader: LoaderFunction = getMakeTypes;

export const MakeTypesView = () => {

	const makeTypes = useLoaderData() as MakeType[];
	const navigate = useNavigate();
	const navigation = useNavigation();

	return (
		<Page
			title='Make Types'
			isEmpty={makeTypes.length === 0}
			hasAdd
			isGridView
		>
			{makeTypes.map(({ _id, name }) =>
				<Card
					key={_id}
					title={name}
					actions={[{
						text: 'Update',
						icon: 'update',
						onClick: () => navigate(`update/${_id}`),
						isLoading: (
							navigation.state !== 'idle'
							&& navigation.location.pathname === `make-types/update/${_id}`
						),
						fullWidth: true,
					}]}
				/>
			)}
		</Page>
	);

};
