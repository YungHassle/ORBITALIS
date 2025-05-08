import {getUsersLeadersList} from "_api/admin/userAcceptList"
import ClientPage from "./page.client"
import {getNewsList} from "_api/admin/newsList"

export default async function Page() {
	const leaders = await getUsersLeadersList()
	const newsList = await getNewsList()
	return <ClientPage leaders={leaders} newsList={newsList} />
}
