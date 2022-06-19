import { ethers } from "ethers";

// hooks
import { useEffect } from 'react';

import {
	useAppDispatch,
	useTypedSelector,
} from '../../hooks/reduxHooks';

// store
import {
	setAddress,
	setConnecting,
	setAvailability,
} from '../../store/account/accountSlice';
import { setNotification } from '../../store/notifier';

// utils
// import networks from "../../utils/networks";

export const WalletHandler = () => {
	const dispatch = useAppDispatch();
	const {
		address,
		isAvailable,
		isConnecting,
	} = useTypedSelector(state => state.account);

	// const NEWTWORK_CHAIN_ID = Number(process.env.NEXT_PUBLIC_NEWTWORK_CHAIN_ID) || 56;

	const ethereumHandler = () => {
		const ethereum = (window as any).ethereum;

		if (ethereum && ethereum.isMetaMask) {
			dispatch(setAvailability(true));
		} else {
			dispatch(setAvailability(false));

			dispatch(setNotification({
				message: 'Metamask not found!',
				variant: 'error',
			}))
		}
	}

	const logout = () => {
		dispatch(setAddress(''));

		localStorage.removeItem('connected');
	}

	const accountHandler = (data: any) => {
		if (localStorage.getItem('connected') && localStorage.getItem('connected') === 'true') {
			logout();

			dispatch(setAddress(data[0]));
			dispatch(setConnecting(false));

			localStorage.setItem('connected', 'true');

			dispatch(setNotification({
				message: 'Wallet connected!',
				variant: 'success',
			}))
		}
	}

	// const networkHandler = async () => {
	// 	const currentNetworkChainId = await getCurrentNetworkChainId();

	// 	if (currentNetworkChainId !== NEWTWORK_CHAIN_ID) {
	// 		notify({
	// 			message: `Please change your network to ${networks[NEWTWORK_CHAIN_ID].chainName}`,
	// 			variant: 'warning',
	// 		})

	// 		try {
	// 			const res = await changeCurrentNetwork(NEWTWORK_CHAIN_ID);

	// 			notify({
	// 				message: res.message,
	// 				variant: res.variant,
	// 			})
	// 		} catch (error: any) {
	// 			if (error?.code === -32002) {
	// 				notify({
	// 					message: 'Network change request is pending',
	// 					variant: 'warning',
	// 				})
	// 			} else {
	// 				notify({
	// 					message: error.message,
	// 					variant: error.variant,
	// 				})
	// 			}
	// 		}
	// 	}
	// }

	const connectPreviousAccount = async () => {
		const ethereum = (window as any).ethereum;
		const address = await ethereum.request({ method: "eth_accounts" });

		if (address[0]) {
			dispatch(setAddress(address[0]));
			dispatch(setConnecting(false));

			dispatch(setNotification({
				message: 'Wallet connected!',
				variant: 'success',
			}))
		}
	}

	const getCurrentNetworkChainId = async () => {
		const ethereum = (window as any).ethereum;

		const provider = new ethers.providers.Web3Provider(ethereum);
		const network = await provider.getNetwork();

		return network.chainId;
	}

	const connectWallet = async () => {
		const ethereum = (window as any).ethereum;

		try {
			const accounts = await ethereum.request({ method: "eth_requestAccounts" });

			if (accounts[0]) {
				localStorage.setItem('connected', 'true');

				dispatch(setAddress(accounts[0]));

				dispatch(setNotification({
					message: 'Wallet connected!',
					variant: 'success',
				}))
			}

			dispatch(setConnecting(false));
		} catch (error) {
			dispatch(setNotification({
				message: 'Failed to connect to Metamask!',
				variant: 'error',
			}))

			dispatch(setConnecting(false));
		}
	}

	useEffect(() => {
		setTimeout(() => {
			ethereumHandler();
		}, 1000);
	}, []);

	useEffect(() => {
		!address && isConnecting && connectWallet();
	}, [address, isConnecting]);

	useEffect(() => {
		if (isAvailable) {
			const ethereum = (window as any).ethereum;

			if (localStorage.getItem('connected') && localStorage.getItem('connected') === 'true') {
				connectPreviousAccount();
			}

			// networkHandler();

			// ethereum.on("chainChanged", networkHandler);
			ethereum.on("accountsChanged", accountHandler);
		}
	}, [isAvailable]);

	return null;
}

// const changeCurrentNetwork = async (chainId: number) => {
// 	const ethereum = (window as any).ethereum;

// 	try {
// 		await ethereum.request({
// 			method: "wallet_switchEthereumChain",
// 			params: [{ chainId: networks[chainId].chainId }],
// 		})

// 		return {
// 			message: "Network switched successfully",
// 			variant: "success",
// 		}
// 	} catch (switchError: any) {
// 		if (switchError.code === 4902) {
// 			try {
// 				await ethereum.request({
// 					method: "wallet_addEthereumChain",
// 					params: [{ ...networks[chainId] }],
// 				})

// 				return {
// 					message: "Network switched successfully",
// 					variant: "success",
// 				}
// 			} catch (addError: any) {
// 				throw {
// 					message: addError.message,
// 					variant: "error",
// 					code: addError.code,
// 				}
// 			}
// 		} else {
// 			throw {
// 				message: switchError.message,
// 				variant: "error",
// 				code: switchError.code,
// 			}
// 		}
// 	}
// }

export default WalletHandler;
