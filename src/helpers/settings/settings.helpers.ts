import { isValidUser } from 'helpers/type';

import { Settings } from 'types/general';

const getSetting = <Key extends keyof Settings>(
	key: Key
): null | Settings[Key] => {
	try {

		const result = localStorage.getItem(key);
		if (!result) return null;

		const parsed = JSON.parse(result);
		const isInvalid = (
			(key === 'isDarkMode' && typeof parsed !== 'boolean')
			|| (key === 'user' && !isValidUser(parsed))
			|| (['accessToken', 'refreshToken'].includes(key) && typeof parsed !== 'string')
		);
		if (isInvalid) {
			removeSetting(key);
			return null;
		}
		return parsed;

	}
	catch (error) {
		return null;
	}
};

const setSetting = <Key extends keyof Settings>(
	key: Key,
	value: Settings[Key]
): void => {
	localStorage.setItem(key, JSON.stringify(value));
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