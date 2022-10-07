export type CxInput = (
	| string
	| 0
	| undefined
	| false
	| null
	| CxInput[]
);

export const cx = (...input: CxInput[]): string => {
	return input.map(row =>
		typeof row === 'string'
			? row
			: Array.isArray(row)
				? cx(...row)
				: ''
	).filter(Boolean).join(' ');
};
