import {getTasksById, getUsersForTasks} from "_api/admin/tasksList"
import ClientPage from "./page.client"
import {getUser} from "_utils/getUser"

export default async function Page() {
	const user = await getUser()
	const tasksList = await getTasksById(user?._id || "")
	const usersList = await getUsersForTasks()
	return <ClientPage tasksList={tasksList} usersList={usersList} userId={user?._id} />
}
