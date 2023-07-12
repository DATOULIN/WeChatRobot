import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/pages/App';
import { BrowserRouter } from 'react-router-dom';
import '@/styles/index.scss';

const root = document.querySelector('#root');

if (root) {
	createRoot(root).render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
}
