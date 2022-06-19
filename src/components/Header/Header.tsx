import { Link } from 'react-router-dom';
import classes from './Header.module.scss';

// components
import { WalletInfo } from '../WalletInfo';

// hooks
import { useTypedSelector } from '../../hooks/reduxHooks';
import { useState } from 'react';

export const Header = () => {
	const { address } = useTypedSelector(state => state.account);

	const [openWaleltInfo, setOpenWaleltInfo] = useState<boolean>(false);

	const formatAddress = (address: string): string => {
		if (!address.length) {
			return '';
		}

		return `${address.slice(0, 4)}...${address.slice(-4)}`;
	}

	return (
		<div className={classes.header}>
			<div className="container">
				<div className={classes.header__body}>
					<Link
						to="/"
						className={classes.header__logo}
					>
						<img
							src="/icons/logo.svg"
							alt="TMQ."
							title="TMQ."
						/>
						<span>
							TMQ.
						</span>
					</Link>
					<div className={classes.header__navigation}>
						{address ? (
							<div
								className={classes.header__address}
								onClick={() => setOpenWaleltInfo(true)}
							>
								{formatAddress(address)}
							</div>
						) : null}
					</div>
				</div>
			</div>
			<WalletInfo
				open={openWaleltInfo}
				onClose={() => setOpenWaleltInfo(false)} />
		</div>
	)
}