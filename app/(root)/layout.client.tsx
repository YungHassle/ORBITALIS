"use client"

import classes from "./layout.module.scss"
import Link from "next/link"
import {usePathname, useRouter} from "next/navigation"
import {motion} from "framer-motion"
import {UserOutlined} from "@ant-design/icons"
import TabWithNavigation from "_components/TabWithNavigation"
import {Avatar, Button, Dropdown, Flex} from "antd"
import BaseIcon from "_components/BaseIcon"
import logo from "_icons/logo.svg"
import {useState} from "react"
import {DatePicker} from "antd"

const {RangePicker} = DatePicker

export default function ClientLayout({children, user}) {
	const router = useRouter()

	const path = usePathname()

	const [selectHoliday, setSelectHoliday] = useState(false)

	return (
		<div className={classes.root} style={{display: "flex", justifyContent: "center"}}>
			<div className={classes.container}>
				<div className={classes.upAndMid}>
					<div className={classes.upper}>
						<Flex align='center' gap={"1em"} className={classes.upInner}>
							<Link href='/'>
								<Flex align='center' gap={"0.5em"}>
									<BaseIcon svg={logo} style={{fontSize: "1.5em"}} />
									<div className={classes.logo}>Orbitalis</div>
								</Flex>
							</Link>
							<Flex align='center' gap={"3em"}>
								<Flex align='center' gap={selectHoliday ? "1em" : "1em"}>
									{user?.role === "admin" && (
										<Button type='primary' size='large' style={{minWidth: "10em"}} onClick={() => router.replace("/admin")}>
											Перейти в контрольную панель
										</Button>
									)}
									<Button type='primary' size='large' style={{minWidth: "10em"}}>
										Пройти тест
									</Button>
									{!selectHoliday && (
										<Button type='primary' size='large' style={{minWidth: "10em"}} onClick={() => setSelectHoliday(true)}>
											Выбрать отпуск
										</Button>
									)}
									{selectHoliday && (
										<Flex align='center' gap={"1em"}>
											<RangePicker
												size='large'
												style={{minWidth: "24em"}}
												placeholder={["Дата начала", "Дата окончания"]}
												format='DD-MM-YYYY'
											/>
											<Button type='primary' size='large' style={{minWidth: "10em"}} onClick={() => setSelectHoliday(false)}>
												Подтвердить
											</Button>
											<Button size='large' style={{minWidth: "10em"}} onClick={() => setSelectHoliday(false)}>
												Отмена
											</Button>
										</Flex>
									)}
								</Flex>
								<Dropdown
									menu={{
										items: [
											{
												label: "Мой профиль",
												key: "profile",
												onClick: () => {
													router.replace("/profile")
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
										<div className={classes.profile}>{user?.name}</div>
										<Avatar size={"large"} style={{backgroundColor: user?.color, minWidth: "40px"}} icon={<UserOutlined />} />
									</Flex>
								</Dropdown>
							</Flex>
						</Flex>
						<div className={classes.downInner}>
							<TabWithNavigation
								basePath=''
								items={[
									{
										key: "/",
										label: "Главная",
									},
									{
										key: "news",
										label: "Новости",
									},
									{
										key: "knowledgebase",
										label: "База знаний",
									},
									{
										key: "tasks",
										label: "Задачи",
									},
									{
										key: "company",
										label: "Компания",
									},
									{
										key: "calendar",
										label: "Календарь",
									},
								]}
							/>
						</div>
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
					<a href='tel:+79999999999'>
						<div style={{fontFamily: "Inter", fontWeight: 500}}>+7 (906) 328-79-75</div>
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
