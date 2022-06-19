import {
	createSlice,
	PayloadAction,
} from "@reduxjs/toolkit";

import { accountInitialState } from "./accountState";

// utils contract methods
import { checksumAddress } from "../../contracts";

const accountSlice = createSlice({
	name: 'account',
	initialState: accountInitialState,
	reducers: {
		setAddress(state, action: PayloadAction<string>) {
			state.address = checksumAddress(action.payload);
		},
		setConnecting(state, action: PayloadAction<boolean>) {
			state.isConnecting = action.payload;
		},
		setAvailability(state, action: PayloadAction<boolean>) {
			state.isAvailable = action.payload;
		},
	}
})

export const {
	setAddress,
	setConnecting,
	setAvailability,
} = accountSlice.actions;

export default accountSlice.reducer;
