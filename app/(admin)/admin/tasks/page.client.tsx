"use client"

import {Avatar, Button, Flex, Form, Input, message, Modal, Select, Space, Spin, Tooltip} from "antd"
import classes from "./page.module.scss"
import {LoadingOutlined, UserOutlined} from "@ant-design/icons"
import {useEffect, useState} from "react"
import TextArea from "antd/es/input/TextArea"
import {createTask, deleteTask, getTasks, updateTask} from "_api/admin/tasksList"

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

export default function ClientPage({tasksList, usersList}: any) {
	const [form] = Form.useForm()
	const [editForm] = Form.useForm()
	const [messageApi] = message.useMessage()
	const [loading, setLoading] = useState(false)
	const [tasks, setTasks] = useState<Task[]>(tasksList)
	const [users, setUsers] = useState<User[]>(usersList)
	const [selectedTask, setSelectedTask] = useState<Task | null>(null)
	const [createTaskModal, setCreateTaskModal] = useState(false)
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

	const handleCreate = async (values: any) => {
		try {
			const result = await createTask({
				...values,
				userId: values.userId,
			})

			if (result.success) {
				setToRightData(null)
				setSelectedTask(null)
				messageApi.success(`Задача ORB_${result.taskNum} успешно создана!`)
				setCreateTaskModal(false)
				form.resetFields()
				getTasks().then((tasks) => setTasks(tasks as any))
			}
		} catch (error) {
			messageApi.error("Произошла ошибка: " + (error instanceof Error ? error.message : "Unknown error"))
		}
	}

	const handleUpdate = async (values: any) => {
		if (!selectedTask) return

		try {
			const result = await updateTask(selectedTask._id, {
				...values,
				userId: values.userId,
			})

			if (result.success) {
				setToRightData(null)
				setSelectedTask(null)
				messageApi.success("Задача успешно обновлена!")
				setChangeTaskModal(false)
				editForm.resetFields()
				getTasks().then((tasks) => setTasks(tasks as any))
			}
		} catch (error) {
			messageApi.error("Произошла ошибка: " + (error instanceof Error ? error.message : "Unknown error"))
		}
	}

	const handleDelete = async () => {
		if (!selectedTask) return

		try {
			const result = await deleteTask(selectedTask._id)
			if (result.success) {
				setToRightData(null)
				setSelectedTask(null)
				setChangeTaskModal(false)
				messageApi.success("Задача удалена")
				editForm.resetFields()
				getTasks().then((tasks) => setTasks(tasks as any))
			} else {
				messageApi.error(result.error || "Ошибка удаления")
			}
		} catch (error) {
			messageApi.error("Ошибка при удалении")
		}
	}

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
				const updatedTasks = await getTasks()
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
			<Flex vertical gap={"1em"} style={{width: "66%"}}>
				<Flex gap={"1em"}>
					<Input
						size='large'
						allowClear
						placeholder='Поиск по названию'
						style={{width: "100%"}}
						value={nameFilter}
						onChange={(e) => setNameFilter(e.target.value)}
					/>
					<Select
						size='large'
						style={{width: "100%"}}
						allowClear
						options={users.map((user) => ({label: user.name, value: user._id}))}
						showSearch
						optionFilterProp='label'
						placeholder='Выберите исполнителя'
						value={userFilter}
						onChange={(value) => setUserFilter(value)}
					/>
					<Select
						size='large'
						style={{width: "100%"}}
						allowClear
						options={categories.map((category) => ({label: category.name, value: category.type}))}
						showSearch
						optionFilterProp='label'
						placeholder='Выберите статус'
						value={statusFilter}
						onChange={(value) => setStatusFilter(value)}
					/>
				</Flex>
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
			</Flex>
			<Flex vertical style={{width: "34%"}} gap={"1em"}>
				<Button
					type='primary'
					size='large'
					onClick={() => {
						setCreateTaskModal(true)
					}}
				>
					Создать задачу
				</Button>
				<Modal
					title='Создание задачи'
					open={createTaskModal}
					onCancel={() => {
						setCreateTaskModal(false)
					}}
					footer={null}
				>
					<Form form={form} layout='vertical' onFinish={handleCreate}>
						<Form.Item label='Название' name='name' rules={[{required: true}]}>
							<Input />
						</Form.Item>
						<Form.Item label='Описание' name='desc' rules={[{required: true}]}>
							<TextArea rows={4} />
						</Form.Item>
						<Form.Item label='Назначить на' name='userId' rules={[{required: true}]}>
							<Select
								options={users.map((user) => ({label: user.name, value: user._id}))}
								showSearch
								optionFilterProp='label'
								placeholder='Выберите пользователя'
							/>
						</Form.Item>
						<Form.Item label='Статус' name='type' initialValue='created'>
							<Select options={categories.map((cat) => ({label: cat.name, value: cat.type}))} />
						</Form.Item>
						<Button type='primary' htmlType='submit' style={{width: "100%"}}>
							Создать
						</Button>
					</Form>
				</Modal>
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
							<Button type='primary' size='large' style={{width: "100%"}} className={classes.button} onClick={() => setChangeTaskModal(true)}>
								Редактировать задачу
							</Button>
							<Flex justify='space-between' align='center'>
								<div>ORB_{toRightData?.num}</div>
								<Select
									className={classes.select}
									value={selectedTask?.type}
									options={categories.map((cat) => ({label: cat.name, value: cat.type}))}
									onChange={handleStatusChange}
								/>
							</Flex>
							<Flex>
								<div>Исполнитель:&nbsp;</div> <div>{usersList.find((u) => u._id === toRightData?.userId)?.name}</div>
							</Flex>
							<div className={classes.name}>{toRightData?.name}</div>
							<div className={classes.desc}>{toRightData?.desc}</div>
						</Space>
					)}
					<Modal
						title='Редактирование задачи'
						open={changeTaskModal}
						onCancel={() => {
							setChangeTaskModal(false)
						}}
						footer={null}
					>
						<Form
							form={editForm}
							layout='vertical'
							initialValues={{
								name: selectedTask?.name,
								desc: selectedTask?.desc,
								userId: selectedTask?.userId,
								type: selectedTask?.type,
							}}
							onFinish={handleUpdate}
						>
							<Form.Item label='Название' name='name' rules={[{required: true}]}>
								<Input />
							</Form.Item>
							<Form.Item label='Описание' name='desc' rules={[{required: true}]}>
								<TextArea rows={4} />
							</Form.Item>
							<Form.Item label='Назначить на' name='userId' rules={[{required: true}]}>
								<Select options={users.map((e) => ({label: e.name, value: e._id}))} showSearch optionFilterProp='label' />
							</Form.Item>
							<Form.Item label='Статус' name='type'>
								<Select options={categories.map((e) => ({label: e.name, value: e.type}))} />
							</Form.Item>
							<Flex vertical gap={"1em"}>
								<Button type='primary' htmlType='submit' style={{width: "100%"}}>
									Сохранить изменения
								</Button>
								<Button danger className={classes.button} onClick={handleDelete} style={{width: "100%"}}>
									Удалить
								</Button>
							</Flex>
						</Form>
					</Modal>
				</Space>
			</Flex>
		</div>
	)
}
