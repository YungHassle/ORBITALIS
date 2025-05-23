import {getUser} from "_utils/getUser"
import ClientLayout from "./layout.client"
import {redirect} from "next/navigation"
import {isMobileDevice} from "next-ultra/utils"

export default async function Layout({children}: {children: React.ReactNode}) {
	const user = await getUser()
	const isMobileView = await isMobileDevice()

	if (user?.role !== "admin") {
		redirect("/")
	}
	return (
		<ClientLayout user={user} isMobileView={isMobileView}>
			{children}
		</ClientLayout>
	)
}
