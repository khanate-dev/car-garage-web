import { ChangeEvent } from 'react';

import { Image } from 'components/ImageUpload';

export const validImageExtensions = [
	'.jpg',
	'.jpeg',
	'.png',
] as const;

export const isValidImage = (file: any): file is File => {
	if (!(file instanceof File)) return false;
	const validImageRegex = new RegExp(
		'.*('
		+ validImageExtensions.join('|').replace(/\./g, 'image/')
		+ ')$',
		'i'
	);
	return validImageRegex.test(file.type);
};

export const handleImageUpload = (
	event: ChangeEvent<HTMLInputElement>
): Image => {

	const { target } = event;

	if (!target.files?.[0]) {
		throw new Error('No File Found!');
	}

	const file = target.files[0];

	if (!isValidImage(file)) {
		throw new Error(`Invalid image! must be one of ${validImageExtensions.join(', ')}`);
	}
	else if (file.size > 3000000) {
		throw new Error('File Must Be Smaller Than 3 MB!');
	}

	const preview = URL.createObjectURL(file);

	return {
		file,
		preview,
	};

};
