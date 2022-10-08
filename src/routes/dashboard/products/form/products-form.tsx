import { ChangeEvent, useState } from 'react';
import {
	ActionFunction,
	redirect,
	useFetcher,
	useLoaderData,
	useParams,
} from 'react-router-dom';

import useFormError from 'hooks/form-error';

import {
	ProductRequest,
	productCategories,
	ProductCategory,
	Product,
} from 'schemas/product';
import { MakeType } from 'schemas/make-type';
import { Model } from 'schemas/model';
import { BodyType } from 'schemas/body-type';
import { getModels } from 'endpoints/model';
import { getBodyTypes } from 'endpoints/body-type';
import { createProduct, getProduct, updateProduct } from 'endpoints/product';
import { getMakeTypes } from 'endpoints/make-type';

import { getActionError } from 'helpers/route';

import Form from 'components/Form';
import Page from 'components/Page';
import Button from 'components/Button';
import Alert from 'components/Alert';
import Stepper from 'components/Stepper';

import {
	FormField,
	FormLoader,
	FormLoaderData,
	SelectFormField,
	SelectOptions,
} from 'types/general';

import styles from './products-form.module.scss';

const steps = [
	'category',
	'type',
	'image',
	'details',
] as const;

type Step = typeof steps[number];

type TypeFields = (
	| 'makeTypeId'
	| 'modelId'
	| 'bodyTypeId'
);

interface Lists {
	lists: {
		makeTypeId: MakeType[],
		modelId: Model[],
		bodyTypeId: BodyType[],
	},
}

export const productsFormLoader: FormLoader<ProductRequest, Lists> = async ({
	params,
}) => {

	const makeTypes = await getMakeTypes();
	const models = await getModels();
	const bodyTypes = await getBodyTypes();

	const product: Partial<Product> = (
		params.productId
			? await getProduct(params.productId)
			: {}
	);

	return {
		bodyTypeId: { value: product.bodyTypeId },
		category: { value: product.category },
		description: { value: product.description },
		image: { value: product.image },
		isFeatured: { value: product.isFeatured },
		makeTypeId: { value: product.makeTypeId },
		maxPrice: { value: product.maxPrice },
		minPrice: { value: product.minPrice },
		modelId: { value: product.modelId },
		sellerId: { value: product.sellerId },
		title: { value: product.title },
		lists: {
			makeTypeId: makeTypes,
			modelId: models,
			bodyTypeId: bodyTypes,
		},
	};
};

export const productsFormAction: ActionFunction = async ({
	params,
	request,
}) => {
	try {
		const formData = await request.formData();
		if (params.productId) {
			await updateProduct(params.productId, formData);
		}
		else {
			await createProduct(formData);
		}
		return redirect('/products');
	}
	catch (error: any) {
		return getActionError({
			source: 'products-form',
			error,
		});
	}
};

const typeFields: SelectFormField<Pick<ProductRequest, TypeFields>>[] = [
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

const detailsFields: FormField<Pick<ProductRequest, DetailsFields>>[] = [
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
	keyof ProductRequest,
	string
>>;

const allFields: FormField<ProductRequest>[] = [
	{ name: 'category', fieldType: 'input' },
	...typeFields,
	{ name: 'image', fieldType: 'input' },
	...detailsFields,
];

export const ProductsForm = () => {

	const { lists, ...data } = useLoaderData() as FormLoaderData<ProductRequest, Lists>;
	const fetcher = useFetcher();
	const { productId } = useParams();
	const error = useFormError('products-form', allFields);

	const [step, setStep] = useState<Step>(steps[0]);
	const [form, setForm] = useState<Form>(
		Object.entries(data).reduce(
			(object, [key, value]) => ({
				...object,
				[key]: value.value,
			}),
			{}
		)
	);

	return (
		<Page
			className={styles['container']}
			title={`${!productId ? 'Add' : 'Update'} Product`}
			hasBack
		>

			<Stepper
				steps={steps as any}
				step={step}
			/>

			{step === 'category' &&
				<Form
					title='Please select the type of product'
					page='products-form'
					fields={productCategories.map(category => ({
						fieldType: 'input',
						type: 'radio',
						name: 'category',
						id: category,
						label: category,
						required: true,
						defaultChecked: form.category === category,
					}))}
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
					noSubmitButton
					noGrid
				/>
			}

			{step === 'type' && form.category &&
				<Form
					title='Please select the type of product'
					page='products-form'
					submitProps={{
						text: 'Next',
						icon: 'next',
					}}
					fields={getTypeFields(form.category as ProductCategory).map(row => {

						const filtered = (
							row.name === 'modelId'
								? lists.modelId.filter(row => row.makeTypeId === form.makeTypeId)
								: row.name === 'bodyTypeId'
									? lists.bodyTypeId.filter(row => row.modelId === form.modelId)
									: lists[row.name]
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
					noSubmitButton
					noGrid
				/>
			}

			{step === 'image' &&
				<Form
					page='products-form'
					title='Please upload an image of the product'
					onSubmit={async (event) => {
						event.preventDefault();
						const json = Object.fromEntries(
							new FormData(event.currentTarget)
						);
						setForm(prev => ({
							...prev,
							...json,
						}));
						setStep('details');
					}}
					fields={[{
						fieldType: 'image',
						name: 'image',
						required: true,
						defaultValue: form.image,
					}]}
					noSubmitButton
					noGrid
				/>
			}

			{step === 'details' &&
				<Form
					title='Please provide the product details'
					page='products-form'
					fields={detailsFields.map(field => ({
						...field,
						defaultValue: form[field.name] as any,
					}))}
					busy={fetcher.state !== 'idle'}
					onSubmit={(event) => {
						event.preventDefault();
						const data = new FormData(event.currentTarget);
						for (const key in form) {
							if (detailsFields.some(({ name }) => key === name)) continue;
							data.append(key, form[key as keyof Form] ?? '');
						}
						fetcher.submit(data, {
							action: (
								!productId
									? '/products/add'
									: `/products/update/${productId}`
							),
							method: (
								!productId
									? 'post'
									: 'put'
							),
							encType: 'multipart/form-data',
						});
					}}
					noSubmitButton
					noGrid
				/>
			}

			<div
				className={styles['actions']}
			>
				<Button
					icon='back'
					text='Back'
					disabled={steps.indexOf(step) === 0}
					onClick={() => setStep(prev =>
						steps[steps.indexOf(prev) - 1] ?? 'category'
					)}
					isLoading={fetcher.state !== 'idle'}
				/>
				<Button
					icon={step === 'details' ? 'submit' : 'next'}
					text={step === 'details' ? 'Submit' : 'Next'}
					type='submit'
					form='products-form'
					isLoading={fetcher.state !== 'idle'}
				/>
			</div>

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
