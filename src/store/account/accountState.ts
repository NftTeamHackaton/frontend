export interface IAccountState {
	address: string,
	isConnecting: boolean,
	isAvailable: boolean,
}

export const accountInitialState: IAccountState = {
	address: '',
	isConnecting: false,
	isAvailable: false,
}
