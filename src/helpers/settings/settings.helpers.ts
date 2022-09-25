import { z, ZodSchema } from 'zod';

import { userSansPasswordModelSchema } from 'schemas/user';
import { jwtSchema } from 'schemas/session';

import { Settings } from 'types/general';

const schemaMapping: Record<keyof Settings, ZodSchema> = {
	isDarkMode: z.boolean(),
	user: userSansPasswordModelSchema,
	accessToken: jwtSchema,
	refreshToken: jwtSchema,
};

const getSetting = <Key extends keyof Settings>(
	key: Key
): null | Settings[Key] => {
	try {

		const result = localStorage.getItem(key);
		if (!result) return null;

		const schema = schemaMapping[key];
		const setting = schema.parse(JSON.parse(result));
		return setting;

	}
	catch (error) {
		removeSetting(key);
		return null;
	}
};

const setSetting = <Key extends keyof Settings>(
	key: Key,
	value: Settings[Key]
): void => {
	const schema = schemaMapping[key];
	const setting = schema.parse(value);
	localStorage.setItem(key, JSON.stringify(setting));
};

const removeSetting = (
	key: keyof Settings
): void => {
	localStorage.removeItem(key);
};

export {
	getSetting,
	setSetting,
	removeSetting,
};