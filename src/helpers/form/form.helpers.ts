export const objectToFormData = <
	Type extends Record<string, any>
>(
	object: Type,
	exclude: (keyof Type)[] = []
): FormData => {
	const formData = new FormData();
	for (const key in object) {
		const value = object[key];
		if (
			value === undefined
			|| exclude.includes(key)
			|| (typeof value === 'boolean' && value === false)
		) continue;
		formData.append(
			key,
			(value as any) instanceof Blob
				? value
				: value?.toString() ?? ''
		);
	}
	return formData;
};
