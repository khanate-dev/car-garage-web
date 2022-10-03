import { z } from 'zod';

import { JWT_REGEX } from 'config';

import {
	userSansMetaModelSchema,
	userSansPasswordModelSchema,
} from 'schemas/user';

export const jwtSchema = z.string().regex(JWT_REGEX);

export const loginRequestSchema = z.strictObject({
	email: z.string().email(),
	password: z.string().min(6),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;

export const loginResponseSchema = z.strictObject({
	user: userSansPasswordModelSchema,
	accessToken: jwtSchema,
	refreshToken: jwtSchema,
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export const registerRequestSchema = userSansMetaModelSchema.extend({
	passwordConfirmation: z.string().min(6),
}).refine(
	({ password, passwordConfirmation }) => password === passwordConfirmation,
	'The two passwords do not match'
);

export type RegisterRequest = z.infer<typeof registerRequestSchema>;

export const registerResponseSchema = userSansPasswordModelSchema;