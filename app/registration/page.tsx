"use client"

import {Button, Flex, Form, Input} from "antd"
import {getAuth, register} from "_api/auth"
import {useEffect} from "react"
import {useRouter} from "next/navigation"
import classes from "./page.module.scss"

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
					register(data.username, data.password, data.name).then((res) => {
						if (res.error) {
							return
						} else {
							router.replace("/auth")
						}
					})
				}}
			>
				<div className={classes.headline}>Регистрация</div>
				<Flex vertical>
					<Form.Item label='Логин' name='username' rules={[{required: true, message: "Please input your username!"}]}>
						<Input />
					</Form.Item>
					<Form.Item label='Пароль' name='password' rules={[{required: true, message: "Please input your password!"}]}>
						<Input type='password' />
					</Form.Item>
					<Form.Item label='ФИО' name='name' rules={[{required: true, message: "Please input your name!"}]}>
						<Input />
					</Form.Item>
				</Flex>
				<Button type='primary' htmlType='submit'>
					Зарегистрироваться
				</Button>
			</Form>
		</div>
	)
}
