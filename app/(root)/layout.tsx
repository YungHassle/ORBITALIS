import {getUser} from "_utils/getUser"
import ClientLayout from "./layout.client"

export default async function Layout({children}: {children: React.ReactNode}) {
	const user = await getUser()
	return <ClientLayout user={user}>{children}</ClientLayout>
}
