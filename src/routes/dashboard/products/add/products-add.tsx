import { ChangeEvent, useState } from 'react';
import {
	ActionFunction,
	LoaderFunction,
	redirect,
	useFetcher,
	useLoaderData,
} from 'react-router-dom';

import useFormError from 'hooks/form-error';

import {
	CreateProduct,
	productCategories,
	ProductCategory,
} from 'schemas/product';
import { MakeType } from 'schemas/make-type';
import { Model } from 'schemas/model';
import { BodyType } from 'schemas/body-type';
import { getModels } from 'endpoints/model';
import { getBodyTypes } from 'endpoints/body-type';
import { createProduct } from 'endpoints/product';
import { getMakeTypes } from 'endpoints/make-type';

import { getActionError } from 'helpers/route';

import Form from 'components/Form';
import Page from 'components/Page';
import ImageUpload, { Image } from 'components/ImageUpload';
import Button from 'components/Button';
import Alert from 'components/Alert';

import { FormField, SelectFormField, SelectOptions } from 'types/general';

import styles from './products-add.module.scss';

const steps = [
	'category',
	'type',
	'image',
	'details',
] as const;

type Step = typeof steps[number];

type CategoryForm = Record<'category', boolean>;

const categoryFields: FormField<CategoryForm>[] = productCategories.map(category => ({
	fieldType: 'input',
	type: 'radio',
	name: 'category',
	id: category,
	label: category,
	required: true,
}));

type TypeFields = (
	| 'makeTypeId'
	| 'modelId'
	| 'bodyTypeId'
);

interface TypeOptions {
	makeTypeId: MakeType[],
	modelId: Model[],
	bodyTypeId: BodyType[],
}

export const productsAddLoader: LoaderFunction = async () => {

	const makeTypes = await getMakeTypes();
	const models = await getModels();
	const bodyTypes = await getBodyTypes();
	const options: TypeOptions = {
		makeTypeId: makeTypes,
		modelId: models,
		bodyTypeId: bodyTypes,
	};
	return options;
};

export const productsAddAction: ActionFunction = async ({ request }) => {
	try {
		const formData = await request.formData();
		await createProduct(formData);
		return redirect('/products');
	}
	catch (error: any) {
		return getActionError({
			source: 'products-add',
			error,
		});
	}
};

const typeFields: SelectFormField<Pick<CreateProduct, TypeFields>>[] = [
	{
		name: 'makeTypeId',
		fieldType: 'select',
		required: true,
	},
	{
		name: 'modelId',
		fieldType: 'select',
	},
	{
		name: 'bodyTypeId',
		fieldType: 'select',
	},
];

const getTypeFields = (
	category: ProductCategory
) => (
	category === 'auto-parts'
		? typeFields.filter(field =>
			!['modelId', 'bodyTypeId'].includes(field.name)
		)
		: typeFields
);

type DetailsFields = (
	| 'title'
	| 'description'
	| 'minPrice'
	| 'maxPrice'
	| 'isFeatured'
);

const detailsFields: FormField<Pick<CreateProduct, DetailsFields>>[] = [
	{
		name: 'title',
		fieldType: 'input',
		required: true,
	},
	{
		name: 'description',
		fieldType: 'input',
	},
	{
		name: 'minPrice',
		fieldType: 'input',
		type: 'number',
		min: 1,
		required: true,
	},
	{
		name: 'maxPrice',
		fieldType: 'input',
		type: 'number',
		min: 1,
		required: true,
	},
	{
		name: 'isFeatured',
		fieldType: 'input',
		label: 'Is this a featured product?',
		type: 'checkbox',
	},
];

type Form = Partial<Record<
	keyof CreateProduct,
	string
>>;

const allFields: FormField<CreateProduct>[] = [
	{ name: 'category', fieldType: 'input' },
	...typeFields,
	{ name: 'image', fieldType: 'input' },
	...detailsFields,
];

export const ProductsAdd = () => {

	const typeOptions = useLoaderData() as TypeOptions;
	const fetcher = useFetcher();
	const error = useFormError('products-add', allFields);

	const [step, setStep] = useState<Step>(steps[0]);
	const [form, setForm] = useState<Form>({});
	const [image, setImage] = useState<null | Image>(null);

	return (
		<Page
			className={styles['container']}
			title='Add Product'
			hasBack
		>

			<div
				className={styles['progress']}
			>
				{steps.map((current, index) =>
					<div
						key={current}
						className={
							steps.indexOf(step) > index
								? styles['completed']
								: step === current
									? styles['current']
									: undefined
						}
					></div>
				)}
			</div>

			{step === 'category' &&
				<Form
					title='Please select the type of product'
					page='products-add'
					fields={categoryFields}
					submitProps={{
						text: 'Next',
						icon: 'next',
					}}
					onSubmit={event => {
						event.preventDefault();
						const checked = event.currentTarget.querySelector(
							'input[type=radio]:checked'
						);
						if (!checked?.id) return;
						setForm(prev => ({
							...prev,
							category: checked.id,
						}));
						setStep('type');
					}}
					noGrid
				/>
			}

			{step === 'type' && form.category &&
				<Form
					title='Please select the type of product'
					page='products-add'
					submitProps={{
						text: 'Next',
						icon: 'next',
					}}
					fields={getTypeFields(form.category as ProductCategory).map(row => {

						const filtered = (
							row.name === 'modelId'
								? typeOptions.modelId.filter(row => row.makeTypeId === form.makeTypeId)
								: row.name === 'bodyTypeId'
									? typeOptions.bodyTypeId.filter(row => row.modelId === form.modelId)
									: typeOptions[row.name]
						);
						const options: SelectOptions = filtered.map(row => ({
							label: row.name,
							value: row._id,
						}));
						return {
							...row,
							options: options,
							value: form[row.name],
							onChange: ({ target }: ChangeEvent<HTMLSelectElement>) => {
								setForm(prev => ({
									...prev,
									modelId: target.name === 'makeTypeId' ? '' : prev.modelId,
									bodyTypeId: ['makeTypeId', 'modelId'].includes(target.name) ? '' : prev.bodyTypeId,
									[target.name]: target.value,
								}));
							},
						};

					})}
					onSubmit={event => {
						event.preventDefault();
						const json = Object.fromEntries(
							new FormData(event.currentTarget)
						);
						setForm(prev => ({
							...prev,
							...json,
						}));
						setStep('image');
					}}
					noGrid
				/>
			}

			{step === 'image' &&
				<form
					className={styles['image-form']}
					title='Please upload an image of the product'
					onSubmit={async (event) => {
						event.preventDefault();
						if (!image) return;
						setStep('details');
					}}
				>
					<ImageUpload
						image={image}
						setImage={setImage}
						required
					/>
					<Button
						text='Next'
						icon='next'
						type='submit'
					/>
				</form>
			}

			{step === 'details' &&
				<Form
					title='Please provide the product details'
					page='products-add'
					fields={detailsFields}
					busy={fetcher.state !== 'idle'}
					onSubmit={async (event) => {
						event.preventDefault();
						if (!image?.file) return;
						const data = new FormData(event.currentTarget);
						for (const key in form) {
							data.append(key, form[key as keyof Form] ?? '');
						}
						data.append('image', image.file);
						fetcher.submit(data, {
							action: '/products/add',
							method: 'post',
							encType: 'multipart/form-data',
						});
					}}
				/>
			}

			{steps.indexOf(step) > 0 &&
				<Button
					icon='back'
					text='Back'
					variant='outline'
					onClick={() => setStep(prev =>
						steps[steps.indexOf(prev) - 1] ?? 'category'
					)}
				/>
			}

			{error.type !== 'none' &&
				<Alert
					className={styles['error']}
					message={error.message}
					size='large'
					color='danger'
				/>
			}

		</Page>
	);
};
