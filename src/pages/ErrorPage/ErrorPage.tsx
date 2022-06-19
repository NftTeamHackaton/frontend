import { Link } from 'react-router-dom';
import classes from './ErrorPage.module.scss';

export const ErrorPage = () => {
	return (
		<main className={classes.errorPage}>
			<div className="container">
				<div className={classes.errorPage__body}>
					<div className={classes.errorPage__content}>
						<div className={classes.errorPage__decorate}>
							<div className={classes.errorPage__model}>
								<iframe
									src="https://my.spline.design/noisedisplacecopy-ee502abfa56b646beef7d4bd02d7a631/"
									frameBorder="0"
									width="120%"
									height="120%"
								></iframe>
							</div>
						</div>
					</div>
					<Link
						to="/"
						className={classes.errorPage__link}
					>
						Go to home page
					</Link>
				</div>
			</div>
		</main>
	)
}
