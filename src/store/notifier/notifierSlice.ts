import { createSlice } from "@reduxjs/toolkit";

const notifierSlice = createSlice({
	name: "notifier",
	initialState: {
		notifications: [],
	},
	reducers: {
		addNotification: (state: any, action) => {
			state.notifications.push(action.payload);
		},
		setNotification: (state: any, action) => {
			state.notifications = [action.payload];
		},
		removeNotification: (state, action) => {
			state.notifications = action.payload;
		},
	},
});

export default notifierSlice.reducer;
export const { addNotification, removeNotification, setNotification } = notifierSlice.actions;
