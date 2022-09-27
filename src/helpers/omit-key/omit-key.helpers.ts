const omitKey = <
	Type extends Record<string, any>,
	Key extends keyof Type
>(
	input: Type,
	key: Key
): Omit<Type, Key> => {
	const output = { ...input };
	delete output[key];
	return output;
};

export default omitKey;