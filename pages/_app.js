import "_styles/globals.css"
import "_styles/font.css"

import Head from "next/head"
import AdminLayout from "../core/layouts/Admin"
import {useEffect} from "react"

function MyApp({Component, pageProps, router, isMobileView, notFound}) {
	let Layouy
	if (router.asPath.startsWith("/admin")) Layouy = AdminLayout

	useEffect(() => {
		if (notFound) router.replace("/you-are-not-admin")
	}, [])

	if (notFound) return <></>

	return (
		<div>
			<Head>
				<title>{(Component.title ? `${Component.title} | ` : "") + "Orbitalis"}</title>
			</Head>
			<Layouy>
				<Component {...pageProps} isMobileView={isMobileView} />
			</Layouy>
		</div>
	)
}

MyApp.getInitialProps = async ({ctx}) => {
	let isMobileView = (ctx.req ? ctx.req.headers["user-agent"] : navigator.userAgent)?.match?.(
		/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
	)
	if (ctx.asPath.startsWith("/admin")) {
		const user = await fetch("http://localhost:3000/api/user", {
			headers: {
				cookie: ctx.req.headers.cookie,
			},
		}).then((res) => res.json())
		if (!user?.groups?.includes("admin"))
			return {
				notFound: true,
			}
	}

	return {
		isMobileView: Boolean(isMobileView),
	}
}

export default MyApp
