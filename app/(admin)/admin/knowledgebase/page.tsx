import ClientPage from "./page.client"
import {getArticles} from "_api/admin/articlesList"

export default async function Page() {
	const ArticlesList = await getArticles()
	return <ClientPage ArticlesList={ArticlesList} />
}
