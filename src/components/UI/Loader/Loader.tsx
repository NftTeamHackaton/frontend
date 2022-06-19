import classes from './Loader.module.scss';

export const Loader = () => {
	return (
		<div className={classes.loader}>
			<div className={classes.loader__body}>
				<span className={classes.loader__item}></span>
				<span className={classes.loader__item}></span>
				<span className={classes.loader__item}></span>
				<span className={classes.loader__item}></span>
				<span className={classes.loader__item}></span>
			</div>
		</div>
	)
}
