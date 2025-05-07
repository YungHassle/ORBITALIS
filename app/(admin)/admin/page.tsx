import {getUsersLeadersList, getUsersWithoutAccept} from "_api/admin/userAcceptList"
import ClientPage from "./page.client"

export default async function Page() {
	const usersList = await getUsersWithoutAccept()
	const leaders = await getUsersLeadersList()
	return <ClientPage usersList={usersList} leaders={leaders} />
}
