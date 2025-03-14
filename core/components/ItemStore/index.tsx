import Card from "../Card"
import classes from "./index.module.scss"
import {useState} from "react"

export default function ItemStore({_id, name, customImg, desc, price, shortname, count, discount, user, blueprint}) {
	const [modalActive, setModalActive] = useState(false)
	return (
		<div>
			<Card className={classes.root} onClick={() => setModalActive(true)}>
				{discount && <div className={classes.discount}>-{discount > 100 ? 100 : discount}%</div>}
				<div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end"}}>
					<div className={classes.name}>{name}</div>
					<div style={{display: "flex", flexDirection: "column", alignItems: "flex-end"}}>
						{discount && <div className={classes.discountPrice}>{price} ₽</div>}
						<div className={classes.price}>
							{discount > 100 ? Math.ceil(price - (price / 100) * 100) : discount > 0 ? Math.ceil(price - (price / 100) * discount) : price} ₽
						</div>
					</div>
				</div>
			</Card>
		</div>
	)
}
