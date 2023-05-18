import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import { routeMaps } from '@/routes/routeMaps';
import DTLoading from '@/components/DTLoading';
function App() {
	const elementRoute = useRoutes(routeMaps);
	return <Suspense fallback={<DTLoading />}>{elementRoute}</Suspense>;
}

export default App;
