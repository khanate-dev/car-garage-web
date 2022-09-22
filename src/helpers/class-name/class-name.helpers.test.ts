import { cx, CxInput } from './class-name.helpers';

interface Test {
	input: CxInput[],
	output: string,
}

const tests: Test[] = [
	{
		input: [
			undefined,
			false && 'first',
			true && 'second',
			'third fourth',
			['fifth', 'sixth', false && 'seventh'],
		],
		output: 'second third fourth fifth sixth',
	},
	{
		input: [],
		output: '',
	},
	{
		input: [undefined, false, null, 'class'],
		output: 'class',
	},
];

describe('test cx helper', () => {
	for (const test of tests) {
		it(`should return ${test.output} for cx(${test.input.join(', ')})`, () => {
			const output = cx(...test.input);
			expect(output).toStrictEqual(test.output);
		});
	}
});
