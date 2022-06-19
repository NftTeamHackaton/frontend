import classes from './Network.module.scss';

// components
import { NftCard } from '../NftCard';
import { Loader } from '../UI/Loader/Loader';
import { Placeholder } from '../UI/Placeholder';

// interfaces
interface INetwork {
	items: any[],
	name: string,
	loading: boolean,
	chainId: number,
	updateData: any,
}

export const Network = ({
	items,
	name,
	loading,
	chainId,
	updateData,
}: INetwork) => {
	return (
		<div className={classes.network}>
			<div className={classes.network__header}>
				<p className={classes.network__title}>
					Your NFTs on
					<img
						src={`/icons/${name.toLowerCase()}.svg`}
						title="ethereum"
						alt="ethereum"
					/>
					<span>
						{name}
					</span>
				</p>
				<button
					className={classes.network__button}
					onClick={updateData}
				>
					<img
						src="/icons/refresh.svg"
						alt="refresh"
						title="refresh"
					/>
				</button>
			</div>
			<div className={classes.network__body}>
				{loading ? (
					<Loader />
				) : (items && items.length) ? (
					<div className={classes.network__list}>
						{items.map((nft: any) => (
							<NftCard
								picture={nft.picture}
								id={nft.nft_id}
								name={nft.name}
								address={nft.nft_address}
								chainId={chainId}
							/>
						))}
					</div>
				) : (
					<Placeholder
						title="Oops.. There is nothing here."
						text="Switch the network"
					/>
				)}
			</div>
		</div>
	)
}
