import {
	configureStore,
	combineReducers,
} from '@reduxjs/toolkit';

// slices
import accountSlice from './account/accountSlice';
import notifierSlice from "./notifier/notifierSlice";
import transferNFTSlice from './transferNFT/transferNFTSlice';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
	account: accountSlice,
	notifier: notifierSlice,
	transfer: transferNFTSlice,
})

const store = configureStore({
	reducer: rootReducer,
})

export default store;
