import {getUsersLeadersList, getUsersWithAccept, getUsersWithoutAccept} from "_api/admin/userAcceptList"
import ClientPage from "./page.client"

export default async function Page() {
	const usersList = await getUsersWithoutAccept()
	const initialLeaders = await getUsersLeadersList()
	const acceptUsers = await getUsersWithAccept()
	return <ClientPage usersList={usersList} initialLeaders={initialLeaders} acceptUsers={acceptUsers} />
}
