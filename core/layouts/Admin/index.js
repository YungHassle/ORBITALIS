import classes from "./index.module.scss"
import {useRouter} from "next/router"

const MENU = []

export default function AdminLayout({children}) {
	const router = useRouter()

	return userLoaded ? (
		<div direction='column' className={classes.root}>
			<div className={classes.header} align='center' justify='space-between'>
				<div>
					<button btnType='text' className={classes.logo}>
						ORBITALIS Admin
					</button>
				</div>
				<div>
					{userBaded ? (
						<button btnType='text' className={classes.profile} onClick={() => apiRequest("/user/login").then((res) => router.push(res.url))}>
							Войти
						</button>
					) : (
						<button btnType='text' className={classes.profile}>
							{user.username}
							<img src={user.avatar} className={classes.avatar} />
						</button>
					)}
				</div>
			</div>
			<div>
				<div direction='column' className={classes.aside}>
					{MENU.map((e, i) => (
						<div key={i}></div>
					))}
				</div>
				<div className={classes.content}>{children}</div>
			</div>
		</div>
	) : (
		<></>
	)
}
