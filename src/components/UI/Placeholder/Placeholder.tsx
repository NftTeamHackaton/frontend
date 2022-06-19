import classes from './Placeholder.module.scss';

interface IPlaceholder {
	title: string,
	text?: string,
}

export const Placeholder = ({
	title,
	text,
}: IPlaceholder) => {
	return (
		<div className={classes.placeholder}>
			<img
				src="/images/placeholder.svg"
				alt="logo"
				className={classes.placeholder__image}
			/>
			<p className={classes.placeholder__title}>
				{title}
			</p>
			{text ? (
				<p className={classes.placeholder__text}>
					{text}
				</p>
			) : null}
		</div>
	)
}