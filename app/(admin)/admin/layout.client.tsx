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
									<div className={classes.logo}>Orbitalis — ADMIN</div>
								</Flex>
							</Link>
							<Flex align='center' gap={"3em"}>
								<Flex align='center' gap={selectHoliday ? "1em" : "1em"}>
									<Button type='primary' size='large' onClick={() => router.replace("/")}>
										Перейти в основное приложение
									</Button>
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
												label: "Настройки",
												key: "settings",
												onClick: () => {
													router.replace("/settings")
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
										<Avatar size={"large"} className={classes.avatar} icon={<UserOutlined />} />
									</Flex>
								</Dropdown>
							</Flex>
						</Flex>
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
										key: "admin/tasks",
										label: "Задачи",
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
						<div style={{fontFamily: "Inter", fontWeight: 500}}>+7 (999) 999-99-99</div>
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
