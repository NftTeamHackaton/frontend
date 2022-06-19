import './App.scss';

import { AppRoutes } from './routes';

// components
import { Header } from './components/Header';
import { Notifier } from './components/Notifier';
import { WalletHandler } from './components/WalletHandler';

const App = () => {
	return (
		<div className="App">
			<body>
				<WalletHandler />
				<Header />
				<Notifier />
				<AppRoutes />
			</body>
		</div>
	)
}

export default App;
