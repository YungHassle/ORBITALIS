"use client"

import {Button, Divider, Flex, Form, Input, message, Modal, Select, Space, Tag, DatePicker} from "antd"
import classes from "./page.module.scss"
import {useEffect, useState} from "react"
import TextArea from "antd/es/input/TextArea"
import {createNews, deleteNews, getNewsList, updateNews} from "_api/admin/newsList"
import dayjs from "dayjs"

interface NewsItem {
	_id: string
	headline: string
	subheadline?: string
	description?: string
	tags?: string[]
	createdAt?: string
	endedAt?: string
}

export default function ClientPage({newsList}: {newsList: NewsItem[]}) {
	const [form] = Form.useForm()
	const [editForm] = Form.useForm()
	const [messageApi, contextHolder] = message.useMessage()
	const [news, setNews] = useState<NewsItem[]>(newsList)
	const [createNewsModal, setCreateNewsModal] = useState(false)
	const [changeNewsModal, setChangeNewsModal] = useState(false)
	const [modalActive, setModalActive] = useState(false)
	const [modalData, setModalData] = useState<NewsItem | null>(null)
	const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)

	const refreshNews = async () => {
		try {
			const updatedNews = await getNewsList()
			setNews(updatedNews as any)
		} catch (error) {
			messageApi.error("Ошибка при обновлении списка новостей")
		}
	}

	const handleCreate = async (values: any) => {
		try {
			const result = await createNews({
				...values,
				endedAt: values.endedAt ? values.endedAt.toISOString() : undefined,
			})

			if (result.success) {
				messageApi.success("Новость успешно создана!")
				setCreateNewsModal(false)
				form.resetFields()
				await refreshNews()
			} else {
				messageApi.error(result.error || "Ошибка при создании новости")
			}
		} catch (error) {
			messageApi.error("Произошла ошибка: " + (error instanceof Error ? error.message : "Unknown error"))
		}
	}

	const handleUpdate = async (values: any) => {
		if (!selectedNews) return

		try {
			const result = await updateNews(selectedNews._id, {
				...values,
				endedAt: values.endedAt ? values.endedAt.toISOString() : undefined,
			})

			if (result.success) {
				messageApi.success("Новость успешно обновлена!")
				setChangeNewsModal(false)
				editForm.resetFields()
				await refreshNews()
			} else {
				messageApi.error(result.error || "Ошибка при обновлении новости")
			}
		} catch (error) {
			messageApi.error("Произошла ошибка: " + (error instanceof Error ? error.message : "Unknown error"))
		}
	}

	const handleDelete = async (id: string) => {
		try {
			const result = await deleteNews(id)
			if (result.success) {
				messageApi.success("Новость удалена")
				await refreshNews()
				setChangeNewsModal(false)
			} else {
				messageApi.error(result.error || "Ошибка удаления")
			}
		} catch (error) {
			messageApi.error("Ошибка при удалении")
		}
	}

	const openEditModal = (newsItem: NewsItem, e: React.MouseEvent) => {
		e.stopPropagation()
		setSelectedNews(newsItem)
		editForm.setFieldsValue({
			headline: newsItem.headline,
			subheadline: newsItem.subheadline,
			description: newsItem.description,
			tags: newsItem.tags,
			endedAt: newsItem.endedAt ? dayjs(newsItem.endedAt) : null,
		})
		setChangeNewsModal(true)
	}

	return (
		<div className={classes.root}>
			<Button className={classes.button} type='primary' size='large' onClick={() => setCreateNewsModal(true)}>
				Создать новость
			</Button>
			<Modal
				title='Создание новости'
				open={createNewsModal}
				onCancel={() => {
					setCreateNewsModal(false)
				}}
				footer={null}
			>
				<Form form={form} layout='vertical' onFinish={handleCreate}>
					<Form.Item label='Название новости' name='headline' rules={[{required: true}]}>
						<TextArea rows={2} />
					</Form.Item>
					<Form.Item label='Описание к названию' name='subheadline'>
						<TextArea rows={3} />
					</Form.Item>
					<Form.Item label='Основное описание' name='description'>
						<TextArea rows={6} />
					</Form.Item>
					<Form.Item label='Дата окончания' name='endedAt'>
						<DatePicker format='YYYY-MM-DD' style={{width: "100%"}} />
					</Form.Item>
					<Form.Item label='Теги' name='tags'>
						<Select
							mode='tags'
							allowClear
							options={[
								{value: "Новость", label: "Новость"},
								{value: "Финансы", label: "Финансы"},
								{value: "Внимание", label: "Внимание"},
								{value: "Осторожно", label: "Осторожно"},
							]}
						/>
					</Form.Item>
					<Button type='primary' htmlType='submit' style={{width: "100%"}}>
						Создать
					</Button>
				</Form>
			</Modal>
			<Flex className={classes.list}>
				<Modal
					title='Редактирование новости'
					open={changeNewsModal}
					onCancel={() => {
						setChangeNewsModal(false)
					}}
					footer={null}
				>
					<Form form={editForm} layout='vertical' onFinish={handleUpdate}>
						<Form.Item label='Название новости' name='headline' rules={[{required: true}]}>
							<TextArea rows={2} />
						</Form.Item>
						<Form.Item label='Описание к названию' name='subheadline'>
							<TextArea rows={3} />
						</Form.Item>
						<Form.Item label='Основное описание' name='description'>
							<TextArea rows={6} />
						</Form.Item>
						<Form.Item label='Дата окончания' name='endedAt'>
							<DatePicker format='YYYY-MM-DD' style={{width: "100%"}} />
						</Form.Item>
						<Form.Item label='Теги' name='tags'>
							<Select
								mode='tags'
								allowClear
								options={[
									{value: "Новость", label: "Новость"},
									{value: "Финансы", label: "Финансы"},
									{value: "Внимание", label: "Внимание"},
									{value: "Осторожно", label: "Осторожно"},
								]}
							/>
						</Form.Item>
						<Button type='primary' htmlType='submit' style={{width: "100%", marginBottom: 16}}>
							Сохранить изменения
						</Button>
						<Button danger style={{width: "100%"}} onClick={() => selectedNews && handleDelete(selectedNews._id)}>
							Удалить новость
						</Button>
					</Form>
				</Modal>
				{news?.map((e, i) => (
					<Space
						key={i}
						direction='vertical'
						className={classes.newCard}
						onClick={() => {
							setModalData(e)
							setModalActive(true)
						}}
					>
						<Space direction='vertical' style={{padding: "1em", width: "100%"}}>
							<Button
								style={{width: "100%"}}
								type='primary'
								size='large'
								onClick={(e1) => {
									openEditModal(e, e1)
									e1.stopPropagation()
									setChangeNewsModal(true)
								}}
							>
								Редактировать
							</Button>
							{e.tags && (
								<Space className={classes.goodTags}>
									{e.tags.map((e1, i1) => (
										<Tag key={i1} color={e1 == "Осторожно" ? "red" : e1 == "Внимание" ? "orange" : "green"}>
											{e1}
										</Tag>
									))}
								</Space>
							)}
							<Space className={classes.tags} align='center'>
								{e.createdAt && (
									<Space>
										<div>{"Опублиновано".toUpperCase()}</div>
										<div>{new Date(e.createdAt).toLocaleDateString()}</div>
									</Space>
								)}
								{e.endedAt && (
									<>
										{new Date(e.endedAt) > new Date() && (
											<Space>
												<div>{"Заканчивается".toUpperCase()}</div>
												<div>{new Date(e.endedAt).toLocaleDateString()}</div>
											</Space>
										)}
										{new Date(e.endedAt) < new Date() && (
											<Space>
												<div>{"Закончилось".toUpperCase()}</div>
												<div>{new Date(e.endedAt).toLocaleDateString()}</div>
											</Space>
										)}
									</>
								)}
							</Space>
							{(e.headline || e.subheadline) && (
								<Space direction='vertical'>
									{(e.headline || e.subheadline) && (
										<Space direction='vertical'>
											{e.headline && <div className={classes.headline}>{e.headline}</div>}
											{e.subheadline && <div className={classes.subheadline}>{e.subheadline}</div>}
										</Space>
									)}
								</Space>
							)}
						</Space>
					</Space>
				))}
				<Modal
					open={modalActive}
					onCancel={() => {
						setModalActive(false)
					}}
					footer={null}
				>
					<Space direction='vertical' style={{padding: "2em 0 0 0", width: "100%"}}>
						{modalData?.tags && (
							<Space className={classes.goodTags}>
								{modalData?.tags.map((e1, i1) => (
									<Tag key={i1} color={e1 == "Осторожно" ? "red" : e1 == "Внимание" ? "orange" : "green"}>
										{e1}
									</Tag>
								))}
							</Space>
						)}
						<Space className={classes.tags} align='center'>
							{modalData?.createdAt && (
								<Space>
									<div>{"Опублиновано".toUpperCase()}</div>
									<div>{new Date(modalData?.createdAt).toLocaleDateString()}</div>
								</Space>
							)}
							{modalData?.endedAt && (
								<>
									{new Date(modalData?.endedAt) > new Date() && (
										<Space>
											<div>{"Заканчивается".toUpperCase()}</div>
											<div>{new Date(modalData?.endedAt).toLocaleDateString()}</div>
										</Space>
									)}
									{new Date(modalData?.endedAt) < new Date() && (
										<Space>
											<div>{"Закончилось".toUpperCase()}</div>
											<div>{new Date(modalData?.endedAt).toLocaleDateString()}</div>
										</Space>
									)}
								</>
							)}
						</Space>
						{(modalData?.headline || modalData?.subheadline) && (
							<Space direction='vertical'>
								{(modalData?.headline || modalData?.subheadline) && (
									<Space direction='vertical'>
										{modalData?.headline && <div className={classes.headline}>{modalData?.headline}</div>}
										{modalData?.subheadline && <div className={classes.subheadline}>{modalData?.subheadline}</div>}
									</Space>
								)}
							</Space>
						)}
						{modalData?.description && <Divider />}
						{modalData?.description && <div>{modalData?.description}</div>}
					</Space>
				</Modal>
			</Flex>
		</div>
	)
}
