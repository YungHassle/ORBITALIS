import classes from "./index.module.scss"

export default function Card({children, className, ...props}: any) {
	return (
		<div className={classes.root} {...props}>
			{children}
		</div>
	)
}
