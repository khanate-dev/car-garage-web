import { ChangeEvent } from 'react';

import { backendApiEndpoint } from 'config';

const isValidImage = (file: any): file is File => {
	if (!(file instanceof File)) return false;
	const validImage = /[/.](jpg|jpeg|png)$/i;
	return validImage.test(file.type);
};

const getImageUrl = (
	schema: any,
	object: null | Record<string, any>
): string => {

	if (!object) return '';

	const identifier = object[schema.identifier?.id ?? -1];
	const imageTimeStamp = object[`${schema.name}ImageUrl`];

	if (
		!identifier
		|| !imageTimeStamp
		|| typeof imageTimeStamp !== 'string'
	) return '';

	const url = new URL(
		`/images/${schema.api.route}/${identifier}.png`,
		backendApiEndpoint
	);
	url.searchParams.set('timeStamp', imageTimeStamp);
	return url.href;

};

const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {

	const { target } = event;

	if (!target.files?.[0]) {
		throw new Error('No File Found!');
	}

	const file = target.files[0];

	if (!isValidImage(file)) {
		throw new Error('Please Select A Valid PNG Or JPG Image!');
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

export {
	isValidImage,
	getImageUrl,
	handleImageUpload,
};