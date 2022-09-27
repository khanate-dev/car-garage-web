import z from 'zod';
import { PHONE_REGEX } from 'config';

import { getModelSchema } from 'helpers/schema';

export const userRoles = [
	'user',
	'admin',
	'guest',
] as const;

export type UserRole = typeof userRoles[number];

export const {
	sansMetaModelSchema: userSansMetaModelSchema,
	modelSchema: userModelSchema,
} = getModelSchema({
	name: z.string(),
	email: z.string().email(),
	phoneNumber: z.string().regex(PHONE_REGEX),
	password: z.string(),
	role: z.enum(userRoles),
});

export type UserSansMeta = z.infer<typeof userSansMetaModelSchema>;

export type User = z.infer<typeof userModelSchema>;

export const userSansPasswordModelSchema = userModelSchema.omit({
	password: true,
});

export type UserSansPassword = z.infer<typeof userSansPasswordModelSchema>;

export const defaultUser: User = {
	_id: '1234',
	name: 'john.doe',
	email: 'john@doe.com',
	role: 'admin',
	phoneNumber: '1234',
	password: 'password',
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
	__v: 1,
};