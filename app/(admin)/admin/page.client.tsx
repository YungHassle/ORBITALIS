"use client"

import classes from "./page.module.scss"
import {Avatar, Button, Flex, notification} from "antd"
import {FallOutlined, FundOutlined, PieChartOutlined, RiseOutlined, UserOutlined} from "@ant-design/icons"
import {getRandomColor} from "_utils/getRandomColor"
import {acceptUser, getUsersWithoutAccept} from "_api/admin/userAcceptList"
import {useState} from "react"

export default function ClientPage({usersList, leaders}) {
	const [users, setUsers] = useState(usersList)
	return (
		<div className={classes.root}>
			<div className={classes.left}>
				<Flex className={classes.helloGuestsBlock} wrap>
					{users.length > 0 ? (
						users.map((e, i) => (
							<Flex key={i} align='flex-start' className={classes.blockForAccept}>
								<Avatar size={"large"} style={{backgroundColor: e?.color}} icon={<UserOutlined />} />
								<Flex vertical>
									<div className={classes.name}>{e?.name}</div>
									<Button
										type='primary'
										size='small'
										className={classes.buttonAccept}
										onClick={() => {
											acceptUser(e._id).then((res) => {
												notification.success({message: "Пользователь принят"})
												getUsersWithoutAccept().then((users) => setUsers(users))
											})
										}}
									>
										Принять
									</Button>
								</Flex>
							</Flex>
						))
					) : (
						<Flex>На данный момент нет новых пользователей</Flex>
					)}
				</Flex>
			</div>
			<Flex className={classes.right}>
				<Flex className={classes.block} vertical gap={"1em"}>
					<Flex className={classes.headline}>Руководители</Flex>
					<Flex wrap gap={"1em"}>
						{leaders.map((e, i) => (
							<Flex key={i} align='center' className={classes.blockInBlock}>
								<Avatar size={"large"} style={{backgroundColor: e?.color, minWidth: "40px"}} icon={<UserOutlined />} />
								<Flex vertical>
									<div className={classes.name}>{e?.name}</div>
									<div className={classes.job}>{e?.position}</div>
								</Flex>
							</Flex>
						))}
					</Flex>
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
