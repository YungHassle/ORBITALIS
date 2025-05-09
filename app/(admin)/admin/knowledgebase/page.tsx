import {getTasks, getUsersForTasks} from "_api/admin/tasksList"
import ClientPage from "./page.client"

export default async function Page() {
	const tasksList = await getTasks()
	const usersList = await getUsersForTasks()
	return <ClientPage tasksList={tasksList} usersList={usersList} />
}
