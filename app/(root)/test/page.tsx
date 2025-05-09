import {getTests} from "_api/admin/testsList"
import ClientPage from "./page.client"

export default async function Page() {
	const testsResponse = await getTests()
	const testsList = testsResponse.success ? testsResponse.data : []
	return <ClientPage testsList={testsList as any} />
}
