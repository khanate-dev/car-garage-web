import React from 'react';
import ReactDOM from 'react-dom/client';

import { isFetchMocked } from 'config/app';

import App from './App';

import 'theme/global.scss';

if (isFetchMocked) {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { worker } = require('mocks/browser');
	worker.start();
}

const rootElement = document.getElementById('root');

if (!rootElement) {
	throw new Error('Root element not found in index.html');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
