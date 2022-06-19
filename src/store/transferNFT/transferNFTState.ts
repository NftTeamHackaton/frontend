export interface ITransferNFTState {
	destinationAddress: string,
	nft: {
		id: number | null,
		href: string,
		name: string,
		address: string,
	},
	networks: {
		from: {
			id: number | null,
			name: string,
			icon: string,
		},
		to: {
			id: number | null,
			name: string,
			icon: string,
		},
	},
}

export const transferNFTInitialState: ITransferNFTState = {
	destinationAddress: '',
	nft: {
		id: null,
		href: '',
		name: '',
		address: '',
	},
	networks: {
		from: {
			id: null,
			name: '',
			icon: '',
		},
		to: {
			id: null,
			name: '',
			icon: '',
		},
	},
}
