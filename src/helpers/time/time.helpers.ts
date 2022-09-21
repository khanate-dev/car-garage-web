const wait = async (milliseconds: number) => {
	await new Promise(r => setTimeout(r, milliseconds));
	return Promise.resolve();
};

export {
	wait,
};