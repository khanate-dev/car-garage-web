// // const getBase64 = (file: File) => {
// // 	file.text();
// // 	return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
// // 		const reader = new FileReader();
// // 		reader.onload = () => resolve(reader.result);
// // 		reader.onerror = reject;
// // 		reader.readAsDataURL(file);
// // 	});
// // };

import { imgurAuth } from 'config';

export const getAccessToken = async (): Promise<string> => {

	fetch('https://api.imgur.com/');
	return '';

};

export const uploadImage = async (image: File) => {

	const headers = new Headers();
	headers.append('Authorization', `Client-ID ${imgurAuth.clientId}`);

	const body = new FormData();
	const string = await image.text();
	body.append('image', string);

	console.log(string);

	const response = await fetch('https://api.imgur.com/3/image', {
		method: 'POST',
		headers,
		body,
		redirect: 'follow',
	});
	const url = await response.text();
	console.log(url);
	return url;

};