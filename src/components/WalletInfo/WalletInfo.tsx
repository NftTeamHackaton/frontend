import classes from './WalletInfo.module.scss';

// components
import { Modal } from '@mui/material';

// hooks
// import { useEffect } from 'react';

import {
	useAppDispatch,
	useTypedSelector,
} from '../../hooks/reduxHooks';

// store
import { setAddress } from '../../store/account/accountSlice';
import { setNotification } from '../../store/notifier';

interface IWalletInfo {
	open: boolean,
	onClose: any,
}

export const WalletInfo = ({
	open,
	onClose,
}: IWalletInfo) => {
	const dispatch = useAppDispatch();
	const { address } = useTypedSelector(state => state.account);

	const logoutHandler = () => {
		logout();
		onClose();
	}

	const logout = () => {
		dispatch(setAddress(''));

		localStorage.removeItem('connected');
	}

	return (
		<Modal
			open={open}
			onClose={onClose}
		>
			<div className={classes.walletInfo}>
				<div className={classes.walletInfo__header}>
					<p className={classes.walletInfo__title}>
						Your wallet
					</p>
					<button
						className={classes.walletInfo__close}
						onClick={onClose}
					>
						<span></span>
						<span></span>
					</button>
				</div>
				<div className={classes.walletInfo__body}>
					<p className={classes.walletInfo__address}>
						{address}
					</p>
					<div className={classes.walletInfo__navigation}>
						<p
							className={classes.walletInfo__link}
							onClick={() => {
								navigator.clipboard.writeText(address);

								dispatch(setNotification({
									message: 'Copied to clipboard!',
									variant: 'success',
								}))
							}}
						>
							Copy address
							<img
								src="/icons/info.svg"
								alt="icon"
								title="Copy address"
							/>
						</p>
						<a
							href={`${process.env.NEXT_PUBLIC_BSSCSCAN_LINK}/address/${address}`}
							target="_blank"
							rel="noreferrer"
							className={classes.walletInfo__link}
						>
							View on BscScan
							<img
								src="/icons/info.svg"
								alt="icon"
								title="View on BscScan"
							/>
						</a>
					</div>
				</div>
				<div className={classes.walletInfo__footer}>
					<button
						className={classes.walletInfo__button}
						onClick={() => logoutHandler()}
					>
						Logout
					</button>
				</div>
			</div>

		</Modal>
	)
}
