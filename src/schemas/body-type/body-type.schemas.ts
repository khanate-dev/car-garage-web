import z from 'zod';

import { mongoIdSchema } from 'schemas/mongo';
import { modelSansMetaModelSchema } from 'schemas/model';

import { getModelSchema } from 'helpers/schema';
import { FormField } from 'types/general';

export const {
	sansMetaModelSchema: bodyTypeSansMetaModelSchema,
	modelSchema: bodyTypeModelSchema,
} = getModelSchema({
	name: z.string(),
	modelId: mongoIdSchema,
	model: modelSansMetaModelSchema,
});

export type BodyTypeSansMeta = z.infer<typeof bodyTypeSansMetaModelSchema>;

export type BodyType = z.infer<typeof bodyTypeModelSchema>;

export const bodyTypeRequestSchema = bodyTypeSansMetaModelSchema.omit({
	model: true,
});

export type BodyTypeRequest = z.infer<typeof bodyTypeRequestSchema>;

export const bodyTypeResponseSchema = bodyTypeModelSchema.omit({ model: true });

export type BodyTypeResponse = z.infer<typeof bodyTypeResponseSchema>;

export type BodyTypeForm = BodyTypeRequest;

export const bodyTypeFormFields: FormField<BodyTypeForm>[] = [
	{
		name: 'modelId',
		fieldType: 'select',
		required: true,
	},
	{
		name: 'name',
		fieldType: 'input',
		required: true,
	},
];
