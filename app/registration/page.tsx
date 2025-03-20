"use client"

import {Button, Form, Input} from "antd"
import {getAuth, register} from "_api/auth"
import {useEffect} from "react"
import {useRouter} from "next/navigation"

export default function Page({}) {
	const router = useRouter()

	// useEffect(() => {
	// 	getAuth().then((res) => {
	// 		router.replace("/")
	// 	})
	// }, [])

	return (
		<div>
			<Form
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
				<Form.Item label='Username' name='username' rules={[{required: true, message: "Please input your username!"}]}>
					<Input />
				</Form.Item>
				<Form.Item label='Password' name='password' rules={[{required: true, message: "Please input your password!"}]}>
					<Input type='password' />
				</Form.Item>
				<Form.Item label='Name' name='name' rules={[{required: true, message: "Please input your name!"}]}>
					<Input />
				</Form.Item>
				<Button type='primary' htmlType='submit'>
					Registration
				</Button>
			</Form>
		</div>
	)
}
