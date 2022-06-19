import classes from './NftCard.module.scss';

import { setTransferNFT } from '../../store/transferNFT/transferNFTSlice';

// hooks
import { useAppDispatch } from '../../hooks/reduxHooks';

// interfaces
interface INftCard {
	id: number,
	name: string,
	picture: string,
	address: string,
	chainId: number,
}

export const NftCard = ({
	id,
	name,
	picture,
	address,
	chainId,
}: INftCard) => {
	const dispatch = useAppDispatch();

	const handleTransferNft = (id: number, picture: string, name: string, address: string) => {
		const transferNFT = {
			destinationAddress: '',
			nft: {
				id: id,
				href: picture,
				name: name,
				address: address,
			},
			networks: {
				from: {
					id: chainId === 4 ? 4 : 42,
					name: chainId === 4 ? 'Rinkeby' : 'Kovan',
					icon: chainId === 4 ? '/icons/rinkeby.svg' : '/icons/kovan.svg'
				},
				to: {
					id: chainId === 4 ? 42 : 4,
					name: chainId === 4 ? 'Kovan' : 'Rinkeby',
					icon: chainId === 4 ? '/icons/kovan.svg' : '/icons/rinkeby.svg'
				},
			},
		}

		dispatch(setTransferNFT(transferNFT));
	}

	return (
		<div
			className={classes.nftCard}
			onClick={() => {
				handleTransferNft(id, picture, name, address)
			}}
		>
			<div className={classes.nftCard__photo}>
				<img
					src={picture}
					alt={`${name} ${id}`}
					title={`${name} ${id}`}
				/>
			</div>
			<div className={classes.nftCard__info}>
				<p className={classes.nftCard__title}>
					{name}
				</p>
			</div>
		</div>
	)
}
