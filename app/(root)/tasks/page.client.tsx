"use client"

import {Avatar, Flex, Form, message, Select, Space, Spin, Tooltip} from "antd"
import classes from "./page.module.scss"
import {LoadingOutlined, UserOutlined} from "@ant-design/icons"
import {useEffect, useState} from "react"
import {getTasksById, updateTask} from "_api/admin/tasksList"

interface Task {
	_id: string
	num: number
	name: string
	desc: string
	username: string
	userId: string
	type: string
	createdAt?: string
}
interface User {
	_id: string
	name: string
	color: string
}

export default function ClientPage({tasksList, usersList, userId}: any) {
	const [form] = Form.useForm()
	const [editForm] = Form.useForm()
	const [messageApi] = message.useMessage()
	const [loading, setLoading] = useState(false)
	const [tasks, setTasks] = useState<Task[]>(tasksList)
	const [users, setUsers] = useState<User[]>(usersList)
	const [selectedTask, setSelectedTask] = useState<Task | null>(null)
	const [changeTaskModal, setChangeTaskModal] = useState(false)
	const [toRightData, setToRightData] = useState<any>(null)

	const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasksList)
	const [nameFilter, setNameFilter] = useState("")
	const [userFilter, setUserFilter] = useState(null)
	const [statusFilter, setStatusFilter] = useState(null)

	const categories = [
		{name: "В работе", type: "work"},
		{name: "Выполнена", type: "done"},
		{name: "Отложена", type: "postpone"},
		{name: "В тестировании", type: "testing"},
		{name: "Закрыта", type: "closed"},
		{name: "Отменена", type: "canceled"},
		{name: "Создана", type: "created"},
	]

	useEffect(() => {
		let result = [...tasks]

		if (nameFilter) {
			result = result.filter((task) => task.name.toLowerCase().includes(nameFilter.toLowerCase()))
		}

		if (userFilter) {
			result = result.filter((task) => task.userId === userFilter)
		}

		if (statusFilter) {
			result = result.filter((task) => task.type === statusFilter)
		}

		setFilteredTasks(result)
	}, [tasks, nameFilter, userFilter, statusFilter])

	const handleTaskSelect = (task: Task) => {
		setLoading(true)
		setSelectedTask(task)
		setToRightData(task)
		editForm.resetFields()
		setTimeout(() => setLoading(false), 1000)
	}

	useEffect(() => {
		if (changeTaskModal && selectedTask) {
			editForm.setFieldsValue({
				name: selectedTask.name,
				desc: selectedTask.desc,
				userId: selectedTask.userId,
				type: selectedTask.type,
			})
		}
	}, [changeTaskModal, selectedTask, editForm])

	const handleStatusChange = async (value: string) => {
		if (!selectedTask) return

		try {
			const result = await updateTask(selectedTask._id, {type: value})
			if (result.success) {
				messageApi.success("Статус задачи обновлен")
				const updatedTasks = await getTasksById(userId)
				setTasks(updatedTasks as any)
				const updatedTask = updatedTasks.find((t) => t._id === selectedTask._id)
				if (updatedTask) setSelectedTask(updatedTask as any)
			}
		} catch (error) {
			messageApi.error("Ошибка при обновлении статуса")
		}
	}

	return (
		<div className={classes.root}>
			<Space direction='vertical' className={classes.blockLeft}>
				{filteredTasks.length === 0 ? (
					<div>Задачи не найдены</div>
				) : (
					filteredTasks.map((e, i) => (
						<Space
							align='start'
							key={i}
							className={classes.taskBlock}
							onClick={() => {
								handleTaskSelect(e)
							}}
						>
							<Flex gap={"1em"}>
								<div className={classes.num}>ORB_{e.num}</div>
								<div>{e.name}</div>
							</Flex>
							<Flex align='center' gap={"1em"}>
								<div style={{color: "grey"}}>{categories.find((c) => c.type === e.type)?.name}</div>
								<Tooltip title={usersList.find((u) => u._id === e.userId)?.name} placement='bottom'>
									<Avatar
										size={"default"}
										style={{backgroundColor: usersList.find((u) => u._id === e.userId)?.color, minWidth: "32px"}}
										icon={<UserOutlined />}
									/>
								</Tooltip>
							</Flex>
						</Space>
					))
				)}
			</Space>
			<Flex vertical style={{width: "34%"}} gap={"1em"}>
				<Space direction='vertical' className={classes.blockRight}>
					{!loading && toRightData == null && (
						<Space className={classes.block} direction='vertical' size={20} style={{justifyContent: "center", alignItems: "center"}}>
							<div style={{fontSize: "1.35em"}}>Выберите задачу или создайте новую</div>
						</Space>
					)}
					{loading && (
						<Space style={{width: "100%", height: "36em", justifyContent: "center", alignItems: "center"}}>
							<Spin indicator={<LoadingOutlined style={{fontSize: 100}} spin />} />
						</Space>
					)}
					{!loading && toRightData && (
						<Space className={classes.block} direction='vertical' size={20}>
							<Flex justify='space-between' align='center'>
								<div>ORB_{toRightData?.num}</div>
								<Select
									className={classes.select}
									value={selectedTask?.type}
									options={categories.map((cat) => ({label: cat.name, value: cat.type}))}
									onChange={handleStatusChange}
								/>
							</Flex>
							<div className={classes.name}>{toRightData?.name}</div>
							<div className={classes.desc}>{toRightData?.desc}</div>
						</Space>
					)}
				</Space>
			</Flex>
		</div>
	)
}
