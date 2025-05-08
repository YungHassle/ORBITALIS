"use client"

import {Button, DatePicker, Flex, Form, Input} from "antd"
import {getAuth, register} from "_api/auth"
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
					register(data.username, data.password, data.name, data.birthdayAt, data.position).then((res) => {
						if (res.error) {
							return
						} else {
							router.replace("/auth")
						}
					})
				}}
			>
				<Flex justify='flex-end' align='center'>
					<Link href='/auth'>Авторизоваться</Link>
				</Flex>
				<div className={classes.headline}>Регистрация</div>
				<Flex vertical>
					<Form.Item label='Логин' name='username' rules={[{required: true}]}>
						<Input />
					</Form.Item>
					<Form.Item label='Пароль' name='password' rules={[{required: true}]}>
						<Input type='password' />
					</Form.Item>
					<Form.Item label='ФИО' name='name' rules={[{required: true}]}>
						<Input />
					</Form.Item>
					<Form.Item label='Дата Рождения' name='birthdayAt' rules={[{required: true}]}>
						<DatePicker format='YYYY-MM-DD' style={{width: "100%"}} />
					</Form.Item>
					<Form.Item label='Должность' name='position' rules={[{required: true}]}>
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
