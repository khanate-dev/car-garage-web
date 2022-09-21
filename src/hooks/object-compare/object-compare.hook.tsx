import usePrevious from 'hooks/previous';

import { GenericObject } from 'types/general';

/** shallow compare an object for changed keys */
const useObjectCompare = <Key extends string>(
	object: GenericObject<Key>
): Key[] => {

	const previousObject = usePrevious(object);

	const keys = Object.keys(object) as Key[];
	const changedKeys = keys.filter(key =>
		object[key] !== previousObject?.[key]
	);

	return changedKeys;

};

export default useObjectCompare;