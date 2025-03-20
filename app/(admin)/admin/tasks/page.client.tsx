"use client"

import {Avatar, Button, Flex, Form, Input, Modal, Select, Space, Spin, Tooltip} from "antd"
import classes from "./page.module.scss"
import {LoadingOutlined, UserOutlined} from "@ant-design/icons"
import {getRandomColor} from "_utils/getRandomColor"
import {useState} from "react"
import TextArea from "antd/es/input/TextArea"

export default function ClientPage({}) {
	const [loading, setLoading] = useState(false)
	const [toRightData, setToRightData] = useState<any>(null)
	const [createTaskModal, setCreateTaskModal] = useState(false)
	const [changeTaskModal, setChangeTaskModal] = useState(false)

	const categories = [
		{name: "В работе", type: "work"},
		{name: "Выполнена", type: "done"},
		{name: "Отложена", type: "postpone"},
		{name: "В тестировании", type: "testing"},
		{name: "Закрыта", type: "closed"},
		{name: "Отменена", type: "canceled"},
		{name: "Создана", type: "created"},
	]

	const tasks = [
		{
			num: 101,
			name: "Ссылка в поле Описание в карточке задачи не ставится без выделения слова, нет перехода по ссылке",
			desc: "Ссылка, Ссылка, вставленная в текст, не распознается как ссылка, без принудительного привязывания ссылкиСсылка, вставленная в текст, не распознается как ссылка, без принудительного привязывания ссылкиСсылка, вставленная в текст, не распознается как ссылка, без принудительного привязывания ссылкиСсылка, вставленная в текст, не распознается как ссылка, без принудительного привязывания ссылкиСсылка, вставленная в текст, не распознается как ссылка, без принудительного привязывания ссылкиСсылка, вставленная в текст, не распознается как ссылка, без принудительного привязывания ссылкиСсылка, вставленная в текст, не распознается как ссылка, без принудительного привязывания ссылкиСсылка, вставленная в текст, не распознается как ссылка, без принудительного привязывания ссылкиСсылка, вставленная в текст, не распознается как ссылка, без принудительного привязывания ссылкиСсылка, вставленная в текст, не распознается как ссылка, без принудительного привязывания ссылкиСсылка, вставленная в текст, не распознается как ссылка, без принудительного привязывания ссылкиСсылка, вставленная в текст, не распознается как ссылка, без принудительного привязывания ссылкивставленная в текст, не распознается как ссылка, без принудительного привязывания ссылкиСсылка, вставленная в текст, не распознается как ссылка, без принудительного привязывания ссылкиСсылка, вставленная в текст, не распознается как ссылка, без принудительного привязывания ссылкиСсылка, вставленная в текст, не распознается как ссылка, без принудительного привязывания ссылкиСсылка, вставленная в текст, не распознается как ссылка, без принудительного привязывания ссылкиСсылка, вставленная в текст, не распознается как ссылка, без принудительного привязывания ссылкиСсылка, вставленная в текст, не распознается как ссылка, без принудительного привязывания ссылки",
			username: "Артем",
			type: "work",
		},
		{
			num: 102,
			name: "iPhone Создание задачи - отклонения от макета",
			desc: "Поле Описание отличается разером, цветом и набором опций в визивиге, отсутствием надписи на фоне",
			username: "Оксана",
			type: "done",
		},
		{
			num: 103,
			name: "На iPhone при выборе задачи на оплату всплывает меню для текста",
			desc: "Меню для копирования текста всплывает при длинном клике по любой области. Меню перекрывает задачу, расположенную в строке выше",
			username: "Андрей",
			type: "postpone",
		},
		{
			num: 104,
			name: "Ссылка в поле Описание в карточке задачи не ставится без выделения слова, нет перехода по ссылке",
			desc: "Ссылка, вставленная в текст, не распознается как ссылка, без принудительного привязывания ссылки",
			username: "Артем",
			type: "testing",
		},
		{
			num: 105,
			name: "iPhone Создание задачи - отклонения от макета",
			desc: "Поле Описание отличается разером, цветом и набором опций в визивиге, отсутствием надписи на фоне",
			username: "Оксана",
			type: "closed",
		},
		{
			num: 106,
			name: "На iPhone при выборе задачи на оплату всплывает меню для текста",
			desc: "Меню для копирования текста всплывает при длинном клике по любой области. Меню перекрывает задачу, расположенную в строке выше",
			username: "Андрей",
			type: "canceled",
		},
		{
			num: 107,
			name: "Ссылка в поле Описание в карточке задачи не ставится без выделения слова, нет перехода по ссылке",
			desc: "Ссылка, вставленная в текст, не распознается как ссылка, без принудительного привязывания ссылки",
			username: "Артем",
			type: "created",
		},
		{
			num: 108,
			name: "iPhone Создание задачи - отклонения от макета",
			desc: "Поле Описание отличается разером, цветом и набором опций в визивиге, отсутствием надписи на фоне",
			username: "Оксана",
			type: "created",
		},
		{
			num: 109,
			name: "На iPhone при выборе задачи на оплату всплывает меню для текста",
			desc: "Меню для копирования текста всплывает при длинном клике по любой области. Меню перекрывает задачу, расположенную в строке выше",
			username: "Андрей",
			type: "created",
		},
		{
			num: 109,
			name: "На iPhone при выборе задачи на оплату всплывает меню для текста",
			desc: "Меню для копирования текста всплывает при длинном клике по любой области. Меню перекрывает задачу, расположенную в строке выше",
			username: "Андрей",
			type: "created",
		},
		{
			num: 109,
			name: "На iPhone при выборе задачи на оплату всплывает меню для текста",
			desc: "Меню для копирования текста всплывает при длинном клике по любой области. Меню перекрывает задачу, расположенную в строке выше",
			username: "Андрей",
			type: "created",
		},
		{
			num: 109,
			name: "На iPhone при выборе задачи на оплату всплывает меню для текста",
			desc: "Меню для копирования текста всплывает при длинном клике по любой области. Меню перекрывает задачу, расположенную в строке выше",
			username: "Андрей",
			type: "created",
		},
	]

	const users = [
		{name: "Оксана", _id: 1},
		{name: "Андрей", _id: 2},
		{name: "Артем", _id: 3},
	]

	return (
		<div className={classes.root}>
			<Space direction='vertical' className={classes.blockLeft}>
				{tasks.map((e, i) => (
					<Space
						key={i}
						className={classes.taskBlock}
						onClick={() => {
							setToRightData(e)
							setLoading(true)
							setTimeout(() => setLoading(false), 750)
						}}
					>
						<Flex gap={"1em"}>
							<div className={classes.num}>ORB_{e.num}</div>
							<div>{e.name}</div>
						</Flex>
						<Tooltip title={e.username} placement='bottom'>
							<Avatar size={"default"} style={{backgroundColor: getRandomColor()}} icon={<UserOutlined />} />
						</Tooltip>
					</Space>
				))}
			</Space>
			<Flex vertical style={{width: "34%"}} gap={"1em"}>
				<Button
					type='primary'
					size='large'
					onClick={() => {
						setCreateTaskModal(true)
					}}
				>
					Создать задачу
				</Button>
				<Modal
					title='Создание задачи'
					open={createTaskModal}
					onCancel={() => {
						setCreateTaskModal(false)
					}}
					footer={null}
				>
					<Form layout='vertical' onFinish={async (data) => {}}>
						<Form.Item label='Название' name='username' rules={[{required: true}]}>
							<Input />
						</Form.Item>
						<Form.Item label='Описание' name='username' rules={[{required: true}]}>
							<TextArea />
						</Form.Item>
						<Form.Item label='Назначить на' name='username' rules={[{required: true}]}>
							<Select options={users.map((e) => ({label: e.name, value: e._id}))} />
						</Form.Item>
						<Button type='primary' htmlType='submit' style={{width: "100%"}}>
							Создать
						</Button>
					</Form>
				</Modal>
				<Space direction='vertical' className={classes.blockRight}>
					{!loading && toRightData == null && (
						<Space className={classes.block} direction='vertical' size={20} style={{justifyContent: "center", alignItems: "center"}}>
							<div style={{fontSize: "1.35em"}}>Добро пожаловать в раздел задачи!</div>
						</Space>
					)}
					{loading && (
						<Space style={{width: "100%", height: "36em", justifyContent: "center", alignItems: "center"}}>
							<Spin indicator={<LoadingOutlined style={{fontSize: 100}} spin />} />
						</Space>
					)}
					{!loading && toRightData && (
						<Space className={classes.block} direction='vertical' size={20}>
							<Button type='primary' size='large' className={classes.button} onClick={() => setChangeTaskModal(true)}>
								Редактировать задачу
							</Button>
							<Flex justify='space-between' align='center'>
								<div>ORB_{toRightData?.num}</div>
								<Select
									className={classes.select}
									value={toRightData?.type}
									options={categories?.map((e, i) => ({label: e.name, value: e.type}))}
								/>
							</Flex>
							<div className={classes.name}>{toRightData?.name}</div>
							<div className={classes.desc}>{toRightData?.desc}</div>
						</Space>
					)}
					<Modal
						title='Редактирование задачи'
						open={changeTaskModal}
						onCancel={() => {
							setChangeTaskModal(false)
						}}
						footer={null}
					>
						<Form layout='vertical' onFinish={async (data) => {}}>
							<Form.Item label='Название' name='username' rules={[{required: true}]}>
								<Input />
							</Form.Item>
							<Form.Item label='Описание' name='username' rules={[{required: true}]}>
								<TextArea />
							</Form.Item>
							<Form.Item label='Назначить на' name='username' rules={[{required: true}]}>
								<Select options={users.map((e) => ({label: e.name, value: e._id}))} />
							</Form.Item>
							<Button type='primary' htmlType='submit' style={{width: "100%"}}>
								Изменить
							</Button>
						</Form>
					</Modal>
				</Space>
			</Flex>
		</div>
	)
}
