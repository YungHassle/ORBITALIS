import {getNewsList} from "_api/admin/newsList"
import ClientPage from "./page.client"

export default async function Page() {
	const newsList = await getNewsList()
	return <ClientPage newsList={newsList as any} />
}
