import {
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';

import {
	ITransferNFTState,
	transferNFTInitialState,
} from './transferNFTState';

const transferNFTSlice = createSlice({
	name: 'account',
	initialState: transferNFTInitialState,
	reducers: {
		setTransferNFT(state, action: PayloadAction<ITransferNFTState>) {
			state.destinationAddress = action.payload.destinationAddress;
			state.nft = action.payload.nft;
			state.networks = action.payload.networks;
		},
		setDestinationAddress(state, action: PayloadAction<string>) {
			state.destinationAddress = action.payload;
		},
	}
})

export const {
	setTransferNFT,
	setDestinationAddress,
} = transferNFTSlice.actions;

export default transferNFTSlice.reducer;
