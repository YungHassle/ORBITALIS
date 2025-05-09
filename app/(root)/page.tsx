import {getUsersLeadersList} from "_api/admin/userAcceptList"
import ClientPage from "./page.client"
import {getNewsList} from "_api/admin/newsList"
import {isMobileDevice} from "next-ultra/utils"

export default async function Page() {
	const isMobileView = await isMobileDevice()
	const leaders = await getUsersLeadersList()
	const newsList = await getNewsList()
	return <ClientPage leaders={leaders} newsList={newsList} isMobileView={isMobileView} />
}
