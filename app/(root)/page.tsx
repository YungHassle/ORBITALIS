import {getUsersLeadersList} from "_api/admin/userAcceptList"
import ClientPage from "./page.client"

export default async function Page() {
	const leaders = await getUsersLeadersList()
	return <ClientPage leaders={leaders} />
}
