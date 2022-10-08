import z from 'zod';

import { mongoIdSchema } from 'schemas/mongo';
import { makeTypeSansMetaModelSchema } from 'schemas/make-type';

import { getModelSchema } from 'helpers/schema';
import { FormField } from 'types/general';

export const {
	sansMetaModelSchema: modelSansMetaModelSchema,
	modelSchema: modelModelSchema,
} = getModelSchema({
	name: z.string(),
	year: z.number().positive(),
	makeTypeId: mongoIdSchema,
	makeType: makeTypeSansMetaModelSchema,
});

export type ModelSansMeta = z.infer<typeof modelSansMetaModelSchema>;

export type Model = z.infer<typeof modelModelSchema>;

export const modelRequestSchema = modelSansMetaModelSchema.extend({
	year: z.preprocess(
		(value) => parseInt(z.string().parse(value)),
		z.number().positive()
	),
}).omit({ makeType: true });

export type ModelRequest = z.infer<typeof modelRequestSchema>;

export const modelResponseSchema = modelModelSchema.omit({ makeType: true });

export type ModelResponse = z.infer<typeof modelResponseSchema>;

export type ModelForm = ModelRequest;

export const modelFormFields: FormField<ModelForm>[] = [
	{
		fieldType: 'input',
		name: 'name',
		required: true,
	},
	{
		fieldType: 'input',
		name: 'year',
		type: 'number',
		required: true,
	},
	{
		fieldType: 'select',
		name: 'makeTypeId',
		required: true,
	},
];
