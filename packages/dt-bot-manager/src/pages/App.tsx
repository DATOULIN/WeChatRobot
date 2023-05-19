import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import { routeMaps } from '@/routes/routeMaps';
import DTLoading from '@/components/DTLoading';
import BeforeRoute from '@/components/BeforeRoute';
function App() {
	const elementRoute = useRoutes(routeMaps);
	return (
		<Suspense fallback={<DTLoading />}>
			<BeforeRoute>{elementRoute}</BeforeRoute>
		</Suspense>
	);
}

export default App;
