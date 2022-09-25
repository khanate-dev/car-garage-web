import { z } from 'zod';

import { JWT_REGEX } from 'config';

import { userSansPasswordModelSchema } from 'schemas/user';

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