import classes from './TransferPage.module.scss';

// components
import { Network } from '../../components/Network';
import { Transfer } from '../../components/Transfer';

// api
import { nftAPI } from '../../api/nftAPI';

// hooks
import {
	useState,
	useEffect,
} from 'react';

import { useTypedSelector } from '../../hooks/reduxHooks';

export const TransferPage = () => {
	const { address } = useTypedSelector(state => state.account);

	const [nftList, setNftList] = useState<[]>([]);
	const [kovanNftList, setKovanNftList] = useState<any[]>([]);
	const [rinkebyNftList, setRinkebyNftList] = useState<any[]>([]);

	const [loading, setLoading] = useState<boolean>(true);

	const updateNftListState = async (address: string) => {
		if (address.length) {
			try {
				setLoading(true);
				// const res = await nftAPI.getUserNFTList(address);
				const res = await nftAPI.getUserNFTList('0x56a95488D5689de32498c0693210834da73C7144');

				if (res) {
					console.log(res);
					setNftList(res.data);
				}

				setLoading(false);
			} catch (error: any) {
				console.log('error: ', error);
				setLoading(false);
			}
		}
	}

	const sortNftList = (list: []) => {
		if (list.length) {
			const kovanNftListUpdatedState: any = [];
			const rinkebyNftListUpdatedState: any = [];

			list.forEach((item: any) => {
				if (Number(item.chain_id) === 4) {
					kovanNftListUpdatedState.push(item);
				} else if (Number(item.chain_id) === 42) {
					rinkebyNftListUpdatedState.push(item);
				}
			})

			setKovanNftList(kovanNftListUpdatedState);
			setRinkebyNftList(rinkebyNftListUpdatedState);
		}
	}

	useEffect(() => {
		updateNftListState(address);
	}, [address])

	useEffect(() => {
		sortNftList(nftList);
	}, [nftList])
	return (
		<main className={classes.transferPage}>
			<div className="container">
				<div className={classes.transferPage__body}>
					<Network
						items={kovanNftList}
						name="Rinkeby"
						chainId={4}
						loading={loading}
						updateData={() => updateNftListState(address)}
					/>
					<Transfer />
					<Network
						items={rinkebyNftList}
						name="Kovan"
						chainId={42}
						loading={loading}
						updateData={() => updateNftListState(address)}
					/>
				</div>
			</div>
		</main>
	)
}
