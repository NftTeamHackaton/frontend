import httpClient from './index';

export const nftAPI = {
	getUserNFTList: async (userAddress: string) => {
		try {
			const res = await httpClient.get(`/nft/${userAddress}`, {});

			return res;
		} catch (error: any) {
			throw error;
		}
	},

	createNFT: async (nftAddress: string, chainId: number) => {
		try {
			const res = await httpClient.put('/nft/create', {
				"nft_address": nftAddress,
				"chain_id": chainId,
			})

			return res;
		} catch (error: any) {
			throw error;
		}
	}
}