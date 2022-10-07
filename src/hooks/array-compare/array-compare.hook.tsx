import usePrevious from 'hooks/previous';

/** shallow compare an array for changed indexes */
const useArrayCompare = (
	array: any[]
): number[] => {

	const prevArray = usePrevious(array);

	const changedIndexes = array.filter((_, index) =>
		array[index] !== prevArray?.[index]
	);

	return changedIndexes;

};

export default useArrayCompare;
