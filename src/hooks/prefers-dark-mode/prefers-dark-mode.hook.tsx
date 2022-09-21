import { useEffect, useState } from 'react';

const usePrefersDarkMode = () => {

	const query = window.matchMedia('prefers-color-schema: dark');
	const [prefersDarkMode, setPrefersDarkMode] = useState(query.matches);

	useEffect(() => {
		const callback = (event: MediaQueryListEvent) => {
			setPrefersDarkMode(event.matches);
		};
		query.addEventListener('change', callback);
		return () => {
			query.removeEventListener('change', callback);
		};
	}, []);

	return prefersDarkMode;

};

export default usePrefersDarkMode;