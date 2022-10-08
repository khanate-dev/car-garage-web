import z from 'zod';

import { getModelSchema } from 'helpers/schema';
import { FormField } from 'types/general';

export const {
	sansMetaModelSchema: makeTypeSansMetaModelSchema,
	modelSchema: makeTypeModelSchema,
} = getModelSchema({
	name: z.string(),
});

export type MakeTypeSansMeta = z.infer<typeof makeTypeSansMetaModelSchema>;

export type MakeType = z.infer<typeof makeTypeModelSchema>;

export const makeTypeRequestSchema = makeTypeSansMetaModelSchema;

export type MakeTypeRequest = z.infer<typeof makeTypeRequestSchema>;

export const makeTypeResponseSchema = makeTypeModelSchema;

export type MakeTypResponse = z.infer<typeof makeTypeResponseSchema>;

export type MakeTypeForm = MakeTypeRequest;

export const makeTypeFormFields: FormField<MakeTypeForm>[] = [
	{
		name: 'name',
		fieldType: 'input',
		required: true,
	},
];
