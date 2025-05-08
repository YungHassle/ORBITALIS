"use client"

import classes from "./page.module.scss"
import {Avatar, Button, Flex, Form, Modal, notification, Select} from "antd"
import {FallOutlined, FundOutlined, PieChartOutlined, RiseOutlined, UserOutlined} from "@ant-design/icons"
import {acceptUser, addLeader, deleteUser, getUsersLeadersList, getUsersWithAccept, getUsersWithoutAccept, removeLeader} from "_api/admin/userAcceptList"
import {useState} from "react"

export default function ClientPage({usersList, initialLeaders, acceptUsers}) {
	const [form] = Form.useForm()
	const [users, setUsers] = useState(usersList)
	const [usersAccepted, setUsersAccepted] = useState(acceptUsers)
	const [createLeaderModal, setCreateLeaderModal] = useState(false)
	const [leaders, setLeaders] = useState(initialLeaders)

	const handleAddLeader = async (values: {userId: string}) => {
		try {
			const result = await addLeader(values.userId)
			if (result.success) {
				notification.success({message: "Руководитель успешно добавлен"})
				setCreateLeaderModal(false)
				form.resetFields()
				const updatedLeaders = await getUsersLeadersList()
				setLeaders(updatedLeaders)
				getUsersWithAccept().then((users) => setUsersAccepted(users))
			}
		} catch (error) {
			notification.error({message: "Ошибка при добавлении руководителя"})
		}
	}

	// Функция для удаления руководителя
	const handleRemoveLeader = async (userId: string) => {
		try {
			const result = await removeLeader(userId)
			if (result.success) {
				notification.success({message: "Руководитель удален"})
				const updatedLeaders = await getUsersLeadersList()
				setLeaders(updatedLeaders)
				getUsersWithAccept().then((users) => setUsersAccepted(users))
			}
		} catch (error) {
			notification.error({message: "Ошибка при удалении руководителя"})
		}
	}

	return (
		<div className={classes.root}>
			<div className={classes.left}>
				<Flex className={classes.helloGuestsBlock} vertical gap={"1em"}>
					<Flex className={classes.headline}>Список новых заявок</Flex>
					<Flex wrap gap={"2em"} style={{width: "100%"}}>
						{users.length > 0 ? (
							users.map((e, i) => (
								<Flex key={i} align='flex-start' className={classes.blockForAccept}>
									<Avatar size={"large"} style={{backgroundColor: e?.color, minWidth: "40px"}} icon={<UserOutlined />} />
									<Flex vertical justify='space-between' style={{height: "100%"}} gap={"0.5em"}>
										<Flex vertical>
											<div className={classes.name}>{e?.name}</div>
											<div>{new Date(e?.birthdayAt).toLocaleDateString("ru-RU")}</div>
											<div className={classes.job}>{e?.position}</div>
										</Flex>
										<Flex gap={"0.5em"}>
											<Button
												type='primary'
												size='small'
												className={classes.buttonAccept}
												onClick={() => {
													acceptUser(e._id).then((res) => {
														notification.success({message: "Пользователь принят"})
														getUsersWithoutAccept().then((users) => setUsers(users))
														getUsersWithAccept().then((users) => setUsersAccepted(users))
													})
												}}
											>
												Принять
											</Button>
											<Button
												danger
												size='small'
												onClick={() => {
													deleteUser(e._id).then((res) => {
														notification.success({message: "Пользователь удален"})
														getUsersWithoutAccept().then((users) => setUsers(users))
														getUsersWithAccept().then((users) => setUsersAccepted(users))
													})
												}}
											>
												X
											</Button>
										</Flex>
									</Flex>
								</Flex>
							))
						) : (
							<Flex>На данный момент нет новых пользователей</Flex>
						)}
					</Flex>
				</Flex>
			</div>
			<Flex className={classes.right}>
				<Flex className={classes.block} vertical gap={"1em"}>
					<Flex className={classes.headline}>Руководители</Flex>
					<Flex wrap gap={"1em"}>
						{leaders.map((e, i) => (
							<Flex key={i} align='center' className={classes.blockInBlock}>
								<Avatar size={"large"} style={{backgroundColor: e?.color, minWidth: "40px"}} icon={<UserOutlined />} />
								<Flex vertical justify='space-between' style={{height: "100%"}}>
									<Flex vertical>
										<div className={classes.name}>{e?.name}</div>
										<div className={classes.job}>{e?.position}</div>
									</Flex>
									<Button danger size='small' onClick={() => handleRemoveLeader(e._id)}>
										Удалить
									</Button>
								</Flex>
							</Flex>
						))}
					</Flex>
					<Button type='primary' onClick={() => setCreateLeaderModal(true)}>
						Добавить
					</Button>
					<Modal
						title='Добавление руководителя'
						open={createLeaderModal}
						onCancel={() => {
							setCreateLeaderModal(false)
						}}
						footer={null}
					>
						<Form form={form} layout='vertical' onFinish={handleAddLeader}>
							<Form.Item label='Назначить руководителя' name='userId' rules={[{required: true}]}>
								<Select
									options={usersAccepted.map((user) => ({label: user.name, value: user._id}))}
									showSearch
									optionFilterProp='label'
									placeholder='Выберите пользователя'
								/>
							</Form.Item>
							<Button type='primary' htmlType='submit'>
								Назначить руководителем
							</Button>
						</Form>
					</Modal>
				</Flex>
				<Flex className={classes.block} vertical gap={"1em"}>
					<Flex className={classes.headline}>Мероприятия</Flex>
					<Flex align='center' className={classes.event}>
						<FallOutlined className={classes.icon} />
						<Flex className={classes.title}>Анализ падения доходов в компании</Flex>
					</Flex>
					<Flex align='center' className={classes.event}>
						<RiseOutlined className={classes.icon} />
						<Flex className={classes.title}>Курс повышения квалификации</Flex>
					</Flex>
					<Flex align='center' className={classes.event}>
						<FundOutlined className={classes.icon} />
						<Flex className={classes.title}>Планирование графика работ</Flex>
					</Flex>
					<Flex align='center' className={classes.event}>
						<PieChartOutlined className={classes.icon} />
						<Flex className={classes.title}>Изучение доли расходов в компании по категориям</Flex>
					</Flex>
				</Flex>
			</Flex>
		</div>
	)
}
