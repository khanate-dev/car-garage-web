/* eslint-disable react/no-children-prop */

import { createElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import Providers from 'components/app/Providers';

const renderWithProviders = (component: JSX.Element) => render(
	createElement(Providers, {
		isDarkMode: false,
		setIsDarkMode: () => false,
		children: createElement(Router, {
			children: component,
		}),
	})
);

export {
	renderWithProviders,
};