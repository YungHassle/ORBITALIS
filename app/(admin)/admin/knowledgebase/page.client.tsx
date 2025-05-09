"use client"

import {Button, Flex, Form, Input, message, Modal, Space, Spin} from "antd"
import classes from "./page.module.scss"
import {LoadingOutlined} from "@ant-design/icons"
import {useEffect, useState} from "react"
import TextArea from "antd/es/input/TextArea"
import {createArticle, deleteArticle, getArticles, updateArticle} from "_api/admin/articlesList"

interface Article {
	_id: string
	num: number
	name: string
	desc: string
	username: string
	userId: string
	type: string
	createdAt?: string
}

export default function ClientPage({ArticlesList}: any) {
	const [form] = Form.useForm()
	const [editForm] = Form.useForm()
	const [messageApi] = message.useMessage()
	const [loading, setLoading] = useState(false)
	const [Articles, setArticles] = useState<Article[]>(ArticlesList)
	const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
	const [createArticleModal, setCreateArticleModal] = useState(false)
	const [changeArticleModal, setChangeArticleModal] = useState(false)
	const [toRightData, setToRightData] = useState<any>(null)

	const [filteredArticles, setFilteredArticles] = useState<Article[]>(ArticlesList)
	const [nameFilter, setNameFilter] = useState("")

	useEffect(() => {
		let result = [...Articles]

		if (nameFilter) {
			result = result.filter((Article) => Article.name.toLowerCase().includes(nameFilter.toLowerCase()))
		}

		setFilteredArticles(result)
	}, [Articles, nameFilter])

	const handleArticleSelect = (Article: Article) => {
		setLoading(true)
		setSelectedArticle(Article)
		setToRightData(Article)
		editForm.resetFields()
		setTimeout(() => setLoading(false), 1000)
	}

	useEffect(() => {
		if (changeArticleModal && selectedArticle) {
			editForm.setFieldsValue({
				name: selectedArticle.name,
				desc: selectedArticle.desc,
				userId: selectedArticle.userId,
				type: selectedArticle.type,
			})
		}
	}, [changeArticleModal, selectedArticle, editForm])

	const handleCreate = async (values: any) => {
		try {
			const result = await createArticle({
				...values,
			})

			if (result.success) {
				setToRightData(null)
				setSelectedArticle(null)
				messageApi.success("Статья успешно создана")
				const updatedArticles = await getArticles()
				setArticles(updatedArticles as any)
				setCreateArticleModal(false)
				form.resetFields()
			} else {
				messageApi.error("Ошибка при создании статьи")
			}
		} catch (error) {
			messageApi.error("Ошибка при создании статьи")
		}
	}

	const handleUpdate = async (values: any) => {
		if (!selectedArticle) return

		try {
			const result = await updateArticle(selectedArticle._id, values)

			if (result.success) {
				setToRightData(null)
				setSelectedArticle(null)
				messageApi.success("Статья успешно обновлена")
				const updatedArticles = await getArticles()
				setArticles(updatedArticles as any)
				setChangeArticleModal(false)
				editForm.resetFields()
			} else {
				messageApi.error("Ошибка при обновлении статьи")
			}
		} catch (error) {
			messageApi.error("Ошибка при обновлении статьи")
		}
	}

	const handleDelete = async () => {
		if (!selectedArticle) return

		try {
			const result = await deleteArticle(selectedArticle._id)

			if (result.success) {
				setToRightData(null)
				setSelectedArticle(null)
				messageApi.success("Статья успешно удалена")
				const updatedArticles = await getArticles()
				setArticles(updatedArticles as any)
				setChangeArticleModal(false)
				editForm.resetFields()
			} else {
				messageApi.error("Ошибка при удалении статьи")
			}
		} catch (error) {
			messageApi.error("Ошибка при удалении статьи")
		}
	}

	return (
		<div className={classes.root}>
			<Flex vertical gap={"1em"} style={{width: "33%"}}>
				<Button
					type='primary'
					size='large'
					onClick={() => {
						setCreateArticleModal(true)
					}}
				>
					Создать статью
				</Button>
				<Flex gap={"1em"}>
					<Input
						size='large'
						allowClear
						placeholder='Поиск по названию'
						style={{width: "100%"}}
						value={nameFilter}
						onChange={(e) => setNameFilter(e.target.value)}
					/>
				</Flex>
				<Space direction='vertical' className={classes.blockLeft}>
					{filteredArticles?.length === 0 ? (
						<div>Статьи не найдены</div>
					) : (
						filteredArticles?.map((e, i) => (
							<Space
								align='start'
								key={i}
								className={classes.articleBlock}
								onClick={() => {
									handleArticleSelect(e)
								}}
							>
								<div>{e.name}</div>
							</Space>
						))
					)}
				</Space>
			</Flex>
			<Flex vertical style={{width: "67%"}} gap={"1em"}>
				<Modal
					title='Создание статьи'
					open={createArticleModal}
					onCancel={() => {
						setCreateArticleModal(false)
					}}
					footer={null}
				>
					<Form form={form} layout='vertical' onFinish={handleCreate}>
						<Form.Item label='Название' name='name' rules={[{required: true}]}>
							<Input />
						</Form.Item>
						<Form.Item label='Описание' name='desc' rules={[{required: true}]}>
							<TextArea rows={4} />
						</Form.Item>
						<Button type='primary' htmlType='submit' style={{width: "100%"}}>
							Создать
						</Button>
					</Form>
				</Modal>
				<Space direction='vertical' className={classes.blockRight}>
					{!loading && toRightData == null && (
						<Space className={classes.block} direction='vertical' size={20} style={{justifyContent: "center", alignItems: "center"}}>
							<div style={{fontSize: "1.35em"}}>Выберите статью или создайте новую</div>
						</Space>
					)}
					{loading && (
						<Space style={{width: "100%", height: "36em", justifyContent: "center", alignItems: "center"}}>
							<Spin indicator={<LoadingOutlined style={{fontSize: 100}} spin />} />
						</Space>
					)}
					{!loading && toRightData && (
						<Space className={classes.block} direction='vertical' size={20}>
							<Button type='primary' size='large' style={{width: "100%"}} className={classes.button} onClick={() => setChangeArticleModal(true)}>
								Редактировать статью
							</Button>
							<div className={classes.name}>{toRightData?.name}</div>
							<div className={classes.desc}>{toRightData?.desc}</div>
						</Space>
					)}
					<Modal
						title='Редактирование статьи'
						open={changeArticleModal}
						onCancel={() => {
							setChangeArticleModal(false)
						}}
						footer={null}
					>
						<Form
							form={editForm}
							layout='vertical'
							initialValues={{
								name: selectedArticle?.name,
								desc: selectedArticle?.desc,
								userId: selectedArticle?.userId,
								type: selectedArticle?.type,
							}}
							onFinish={handleUpdate}
						>
							<Form.Item label='Название' name='name' rules={[{required: true}]}>
								<Input />
							</Form.Item>
							<Form.Item label='Описание' name='desc' rules={[{required: true}]}>
								<TextArea rows={4} />
							</Form.Item>
							<Flex vertical gap={"1em"}>
								<Button type='primary' htmlType='submit' style={{width: "100%"}}>
									Сохранить изменения
								</Button>
								<Button danger className={classes.button} onClick={handleDelete} style={{width: "100%"}}>
									Удалить
								</Button>
							</Flex>
						</Form>
					</Modal>
				</Space>
			</Flex>
		</div>
	)
}
