import classes from './NetworkItem.module.scss';

// interfaces
interface INetworkItem {
	name: string,
	icon: string,
	side: number,
}

export const NetworkItem = ({
	name,
	icon,
	side,
}: INetworkItem) => {
	return (
		<div className={classes.networkItem}>
			<p className={classes.networkItem__label}>
				The chain {side === 0 ? 'from' : 'go to'}
			</p>
			<p className={classes.networkItem__title}>
				<img
					src={icon}
					alt={name}
					title={name}
					className={classes.networkItem__icon}
				/>
				<span className={classes.networkItem__name}>
					{name}
				</span>
			</p>
		</div>
	)
}
