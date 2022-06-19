import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import './index.scss';

import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<React.StrictMode>
				<SnackbarProvider
					maxSnack={3}
					autoHideDuration={3000}
					anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				>
					<App />
				</SnackbarProvider>
			</React.StrictMode>
		</Provider>
	</BrowserRouter>,
	document.getElementById("root")
);
