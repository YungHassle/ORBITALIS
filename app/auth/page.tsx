"use client"

import {Button, Form, Input} from "antd"
import {getAuth, login} from "_api/auth"
import {useEffect} from "react"
import {useRouter} from "next/navigation"

export default function Page({}) {
	const router = useRouter()

	useEffect(() => {
		getAuth().then((res) => {
			router.replace("/")
		})
	}, [])

	return (
		<div>
			<Form
				onFinish={async (data) => {
					login(data.username, data.password).then((res) => {
						if (res.error) {
							return
						}
						console.log("res", res)
					})
				}}
			>
				<Form.Item label='Username' name='username' rules={[{required: true}]}>
					<Input />
				</Form.Item>
				<Form.Item label='Password' name='password' rules={[{required: true, message: "Please input your password!"}]}>
					<Input type='password' />
				</Form.Item>
				<Button type='primary' htmlType='submit'>
					Login
				</Button>
			</Form>
		</div>
	)
}
