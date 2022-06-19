import { httpSecondClient as httpClient } from './index';

export const transferAPI = {
	getTransferTxStatusByHash: async (txHash: string) => {
		try {
			const res = await httpClient.get(`/transactions/transaction-status/${txHash}`, {});

			return res;
		} catch (error: any) {
			throw error;
		}
	},
	setNft: async (txHash: string, chainId: number) => {
		try {
			const res = await httpClient.get(`/transactions/transaction-cache/${txHash}/${chainId}`, {});

			return res;
		} catch (error: any) {
			throw error;
		}
	},
}