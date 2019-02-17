import React from 'react';

import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store'

import AppNavigator from './src/main';
import Loading from './src/components/loading';

const App = () => (
	<Provider
		store={store}
	>
		<PersistGate
			loading={<Loading />}
			persistor={persistor}
		> 
			<StatusBar
				backgroundColor="#F5F5F5"
				barStyle="dark-content"
			/>
			<AppNavigator/>
		</PersistGate>
	</Provider>
);
 
export default App;
