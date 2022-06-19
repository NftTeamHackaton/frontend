import classes from './Transfer.module.scss';

// hooks
import {
	useRef,
	useState,
	useEffect,
} from 'react';

import {
	useAppDispatch,
	useTypedSelector,
} from '../../hooks/reduxHooks';

import { NetworkItem } from '../NetworkItem';

import {
	approveNft,
	setApprovalForAll,
	transactionStatusHandler,
	transferNFTfromRinkebyToKovan,
} from '../../contracts';

import { transferAPI } from '../../api/transferAPI';
import { setNotification } from '../../store/notifier';
import { setDestinationAddress } from '../../store/transferNFT/transferNFTSlice';
import { nftAPI } from '../../api/nftAPI';

export const Transfer = () => {
	const dispatch = useAppDispatch();

	const { address } = useTypedSelector(state => state.account);
	const transferNft = useTypedSelector(state => state.transfer);

	const inputRef = useRef(null);

	const handleFocus = () => {
		if (inputRef.current) {
			(inputRef.current as any).focus();
		}
	}

	const createNFTHandler = async (nftAddress: string, chainId: number) => {
		const res = await nftAPI.createNFT(nftAddress, chainId);
	}

	const approveHandler = async (
		nftId: number,
		fromChainId: number,
		userAddress: string,
	) => {
		try {
			const res = await approveNft(nftId, fromChainId, userAddress);

			console.log('res: ', res);
		} catch (error) {
			console.log('error: ', error);
		}
	}

	const transferNftHandler = async (
		userAddress: string,
		recipientAddress: string,
		nftId: number,
		nftAddress: string,
		fromChainId: number,
		toChainId: number,
	) => {
		try {
			const txHash = await transferNFTfromRinkebyToKovan(userAddress, recipientAddress, nftId, nftAddress, fromChainId, toChainId);

			console.log(txHash)

			// const res = await transactionStatusHandler(txHash);
			// console.log('res: ', res);
			// if (res.status) {
			// }
			setTimeout(() => {
				createNFTHandler(nftAddress, toChainId);
			}, 60000)
		} catch (error) {
			console.log(error);
		}
	}

	const onChangeHandler = (e: any) => {
		const { value } = e.target;

		dispatch(setDestinationAddress(value));
	}

	return (
		<div className={classes.transfer}>
			<div className={classes.transfer__item}>
				<p className={classes.transfer__title}>
					Destination Address
				</p>
				<input
					type="text"
					placeholder="Address"
					value={transferNft.destinationAddress}
					onChange={(e) => onChangeHandler(e)}
					className={classes.transfer__input}
					ref={inputRef}
				/>
			</div>
			{transferNft.nft.id ? (
				<>
					<div className={classes.transfer__item}>
						<p className={classes.transfer__title}>
							Selected NFT
						</p>
						<div className={classes.transfer__nft}>
							<div className={classes.transfer__photo}>
								<img
									src={transferNft.nft.href}
									alt={transferNft.nft.name}
									title={transferNft.nft.name}
								/>
							</div>
							<p className={classes.transfer__name}>
								{transferNft.nft.name}
							</p>
						</div>
					</div>
					<div className={classes.transfer__item}>
						<p className={classes.transfer__subtitle}>
							Info
						</p>
						<NetworkItem
							side={0}
							name={transferNft.networks.from.name}
							icon={transferNft.networks.from.icon}
						/>
						<NetworkItem
							side={1}
							name={transferNft.networks.to.name}
							icon={transferNft.networks.to.icon}
						/>
					</div>
				</>
			) : (
				<div className={classes.transfer__item}>
					<p className={classes.transfer__title}>
						Selected NFT
					</p>
					<p className={classes.transfer__empty}>
						None of NFT.
					</p>
					<p className={[classes.transfer__empty, classes.transfer__empty_accent].join(' ')}>
						Select the NFT to swap it
					</p>
				</div>
			)}
			<button
				className={classes.transfer__button}
				onClick={() => {
					approveHandler(transferNft.nft.id || 0, transferNft.networks.from.id || 0, address);
				}}
			>
				Approve access to NFT
			</button>
			<br />
			<button
				className={classes.transfer__button}
				onClick={() => {
					if (transferNft.destinationAddress) {
						transferNftHandler(address, transferNft.destinationAddress, transferNft.nft.id || 0, transferNft.nft.address, transferNft.networks.from.id || 0, transferNft.networks.to.id || 0);
					} else {
						handleFocus();
						dispatch(setNotification({
							message: "Fill Destination Address!",
							variant: "warning"
						}))
					}
				}}
			>
				Transfer NFT
			</button>
		</div>
	)
}