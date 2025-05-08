"use client"

import {Button, Flex, Form, Input} from "antd"
import {getAuth, login} from "_api/auth"
import {useEffect} from "react"
import {useRouter} from "next/navigation"
import classes from "./page.module.scss"
import Link from "next/link"

export default function Page({}) {
	const router = useRouter()

	// useEffect(() => {
	// 	getAuth().then((res) => {
	// 		router.replace("/")
	// 	})
	// }, [])

	return (
		<div className={classes.root}>
			<Form
				layout='vertical'
				className={classes.form}
				onFinish={async (data) => {
					login(data.username, data.password).then((res) => {
						if (res.error) {
							return
						} else {
							router.replace("/")
						}
					})
				}}
			>
				<Flex justify='flex-end' align='center'>
					<Link href='/registration'>Зарегистрироваться</Link>
				</Flex>
				<div className={classes.headline}>Авторизация</div>
				<Flex vertical>
					<Form.Item label='Логин' name='username' rules={[{required: true}]}>
						<Input />
					</Form.Item>
					<Form.Item label='Пароль' name='password' rules={[{required: true, message: "Please input your password!"}]}>
						<Input type='password' />
					</Form.Item>
				</Flex>
				<Button type='primary' htmlType='submit' style={{width: "100%"}}>
					Авторизоваться
				</Button>
			</Form>
		</div>
	)
}
