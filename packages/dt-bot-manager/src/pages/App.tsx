import { useRoutes } from 'react-router-dom';
import { routeMaps } from '@/routes/routeMaps';
import BeforeRoute from '@/components/BeforeRoute';
import AntdThemeProvider from '@/provider/AntdThemeProvider';
import { LoginMachineContext } from '@/machine/login';

function App() {
	const elementRoute = useRoutes(routeMaps);

	return (
		<AntdThemeProvider>
			<LoginMachineContext.Provider>
				<BeforeRoute>{elementRoute}</BeforeRoute>
			</LoginMachineContext.Provider>
		</AntdThemeProvider>
	);
}

export default App;
