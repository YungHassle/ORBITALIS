import {getUser} from "_utils/getUser"
import ClientLayout from "./layout.client"
import {redirect} from "next/navigation"

export default async function Layout({children}: {children: React.ReactNode}) {
	const user = await getUser()

	if (user?.role !== "admin") {
		redirect("/")
	}
	return <ClientLayout user={user}>{children}</ClientLayout>
}
