"use client"

import classes from "./layout.module.scss"
import Link from "next/link"
import {usePathname, useRouter} from "next/navigation"
import {motion} from "framer-motion"
import {UserOutlined} from "@ant-design/icons"
import TabWithNavigation from "_components/TabWithNavigation"
import {Avatar, Button, DatePicker, Dropdown, Flex, Form, Input, Modal} from "antd"
import BaseIcon from "_components/BaseIcon"
import logo from "_icons/logo.svg"
import {useState} from "react"
import dayjs from "dayjs"
import {updateUser} from "_api/user"

export default function ClientLayout({children, user, isMobileView}) {
	const router = useRouter()

	const path = usePathname()

	const [selectHoliday, setSelectHoliday] = useState(false)
	const [profileModal, setProfileModal] = useState(false)

	return (
		<div className={isMobileView ? classes.rootMobile : classes.root} style={{display: "flex", justifyContent: "center"}}>
			<div className={classes.container}>
				<div className={classes.upAndMid}>
					<div className={classes.upper}>
						<Flex align='center' gap={"1em"} className={classes.upInner}>
							<Link href='/admin'>
								<Flex align='center' gap={"0.5em"}>
									<BaseIcon svg={logo} style={{fontSize: "1.5em"}} />
									<div className={classes.logo}>Orbitalis — ADMIN</div>
								</Flex>
							</Link>
							<Flex align='center' gap={"3em"}>
								<Flex align='center' gap={selectHoliday ? "1em" : "1em"}>
									{!isMobileView && (
										<Button type='primary' size='large' onClick={() => router.replace("/")}>
											Перейти в основное приложение
										</Button>
									)}
								</Flex>
								<Dropdown
									menu={{
										items: [
											isMobileView && {
												key: "admin",
												label: "Перейти в основное приложение",
												onClick: () => {
													router.replace("/")
												},
											},
											isMobileView && {
												key: "admin",
												label: "Главная",
												onClick: () => {
													router.replace("/admin")
												},
											},
											isMobileView && {
												key: "admin/news",
												label: "Новости",
												onClick: () => {
													router.replace("/admin/news")
												},
											},
											isMobileView && {
												key: "admin/knowledgebase",
												label: "База знаний",
												onClick: () => {
													router.replace("/admin/knowledgebase")
												},
											},
											isMobileView && {
												key: "admin/tasks",
												label: "Задачи",
												onClick: () => {
													router.replace("/admin/tasks")
												},
											},
											{
												label: "Редактировать профиль",
												key: "profile",
												onClick: () => {
													setProfileModal(true)
												},
											},
											{
												label: "Выход",
												key: "auth",
												onClick: () => {
													router.replace("/auth")
												},
											},
										],
									}}
								>
									<Flex align='center' gap={"1em"}>
										{!isMobileView && <div className={classes.profile}>{user?.name}</div>}
										<Avatar size={"large"} style={{backgroundColor: user?.color, minWidth: "40px"}} icon={<UserOutlined />} />
									</Flex>
								</Dropdown>
							</Flex>
							<Modal title='Редактирование профиля' open={profileModal} onCancel={() => setProfileModal(false)} footer={null}>
								<Form
									layout='vertical'
									className={classes.form}
									initialValues={{
										name: user?.name,
										birthdayAt: user?.birthdayAt ? dayjs(user.birthdayAt) : null,
										position: user?.position,
									}}
									onFinish={async (data) => {
										try {
											const res = await updateUser(
												user._id,
												data.name,
												data.birthdayAt ? data.birthdayAt.format("YYYY-MM-DD") : null,
												data.position,
											)
											if (!res.error) {
												router.refresh()
												setProfileModal(false)
											}
										} catch (error) {
											console.error("Update failed:", error)
										}
									}}
								>
									<Flex vertical gap='middle'>
										<Form.Item label='ФИО' name='name' rules={[{required: true, message: "Пожалуйста, введите ФИО"}]}>
											<Input />
										</Form.Item>
										<Form.Item label='Дата Рождения' name='birthdayAt'>
											<DatePicker format='YYYY-MM-DD' style={{width: "100%"}} />
										</Form.Item>
										<Form.Item label='Должность' name='position'>
											<Input />
										</Form.Item>
										<Button type='primary' htmlType='submit' style={{width: "100%"}}>
											Сохранить изменения
										</Button>
									</Flex>
								</Form>
							</Modal>
						</Flex>
						{!isMobileView && (
							<div className={classes.downInner}>
								<TabWithNavigation
									basePath=''
									items={[
										{
											key: "admin",
											label: "Главная",
										},
										{
											key: "admin/news",
											label: "Новости",
										},
										{
											key: "admin/knowledgebase",
											label: "База знаний",
										},
										{
											key: "admin/tasks",
											label: "Задачи",
										},
									]}
								/>
							</div>
						)}
					</div>
					<div className={classes.content}>
						<motion.div
							key={path}
							transition={{
								ease: "backOut",
								duration: 0.3,
							}}
							initial={{opacity: 0, x: 0, y: 50}}
							animate={{opacity: 1, x: 0, y: 0}}
						>
							{children}
						</motion.div>
					</div>
				</div>
				<div className={classes.footer}>
					<a href='tel:+79213215464'>
						<div style={{fontFamily: "Inter", fontWeight: 500}}>+7 (921) 321-54-64</div>
					</a>
					<Flex align='center' gap={"0.5em"}>
						<div className={classes.logo}>Orbitalis ©</div>
						<div>2024 — {new Date().getFullYear()}</div>
					</Flex>
				</div>
			</div>
		</div>
	)
}
