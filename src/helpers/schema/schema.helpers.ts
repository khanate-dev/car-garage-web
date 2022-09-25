import z from 'zod';

import { mongoIdSchema } from 'schemas/mongo';

export const timestampSchema = z.strictObject({
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const mongoMetaSchema = z.strictObject({
	_id: mongoIdSchema,
	__v: z.number().min(0),
});

export const getModelSchema = <
	Key extends string,
	Schema extends Record<Key, z.ZodTypeAny>
>(
	schema: Schema
) => {

	const sansMetaModelSchema = z.strictObject(schema);

	const modelSchema = z.strictObject({
		...mongoMetaSchema.shape,
		...schema,
		...timestampSchema.shape,
	});

	return {
		sansMetaModelSchema,
		modelSchema,
	};

};