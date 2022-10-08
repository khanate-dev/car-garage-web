import { z } from 'zod';

const _internalSchema = z.object({
	filename: z.string(),
	name: z.string(),
	mime: z.string(),
	url: z.string().url(),
});

export const imageUploadResponseSchema = z.object({
	image: z.object({
		image: _internalSchema,
		medium: _internalSchema,
		thumb: _internalSchema,
		display_url: z.string().url(),
	}),
});
