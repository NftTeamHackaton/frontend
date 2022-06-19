import classes from './IndexPage.module.scss';
import { Link } from 'react-router-dom';

// hooks
import {
	useAppDispatch,
	useTypedSelector,
} from '../../hooks/reduxHooks';

// store
import { setConnecting } from '../../store/account/accountSlice';

export const IndexPage = () => {
	const dispatch = useAppDispatch();

	const {
		address,
		isAvailable,
		isConnecting,
	} = useTypedSelector(state => state.account);

	const handleConnectWallet = () => {
		console.log('isAvailable: ', isAvailable);

		if (isAvailable) {
			dispatch(setConnecting(true));
		}
	}

	return (
		<main className={classes.indexPage}>
			<div className="container">
				<div className={classes.indexPage__body}>
					<div className={classes.indexPage__left}>
						<div className={classes.indexPage__model}>
							<iframe
								src="https://my.spline.design/interactivespherescopy-29b5729b6fa9d9abcf17f07091c4106a/"
								frameBorder="0"
								width="120%"
								height="120%"
							></iframe>
						</div>
					</div>
					<div className={classes.indexPage__right}>
						<div className={classes.indexPage__content}>
							<h1 className={classes.indexPage__title}>
								Transfer NFTs
							</h1>
							<h2 className={classes.indexPage__subtitle}>
								Between Blockchain
							</h2>
							<p className={classes.indexPage__description}>
								You can swap your NFTs between two blockhain network:
								Polygon & Ethereum very fast and with low fees. Try it now!
							</p>
							<div className={classes.indexPage__navigation}>
								{address ? (
									<Link
										to="/transfer"
										className={classes.indexPage__button}
									>
										<img
											src="/icons/logo.svg"
											alt=""
										/>
										<span>
											Transfer NFT
										</span>
									</Link>
								) : (
									<button
										className={classes.indexPage__button}
										onClick={handleConnectWallet}
									>
										<img
											src="/icons/metamask.svg"
											alt=""
										/>
										<span>
											{isConnecting ? (
												'Connecting to metamask'
											) : (
												'Connect metamask'
											)}
										</span>
									</button>
								)}
								<div className={classes.indexPage__links}>
									<a
										href="https://www.google.com/"
										className={classes.indexPage__link}
										target="_blank"
										rel="noreferrer"
									>
										<img
											src="/icons/info.svg"
											alt=""
										/>
										<span>
											Learn how to use NFT bridge
										</span>
									</a>
									<a
										href="https://www.google.com/"
										className={classes.indexPage__link}
										target="_blank"
										rel="noreferrer"
									>
										<img
											src="/icons/info.svg"
											alt=""
										/>
										<span>
											What is NFT?
										</span>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
