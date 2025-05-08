"use client"

import classes from "./page.module.scss"
import {Avatar, Carousel, Divider, Flex, Modal, Space, Tag} from "antd"
import {useState} from "react"
import {FallOutlined, FundOutlined, PieChartOutlined, RadarChartOutlined, RiseOutlined, UserOutlined} from "@ant-design/icons"
import {getRandomColor} from "_utils/getRandomColor"

export default function ClientPage({leaders, newsList}) {
	const [modalActive, setModalActive] = useState(false)
	const [modalData, setModalData] = useState<any>({})

	return (
		<div className={classes.root}>
			<div className={classes.left}>
				<Space className={classes.helloGuestsBlock} direction='vertical' size={30}>
					<img className={classes.imgLogo} src='orb2.jpg' alt='' />
					<div className={classes.headlineText}>
						ORBITALIS — это инновационная IT-компания, которая специализируется на предоставлении комплексных решений в области информационных
						технологий. Мы помогаем бизнесу достигать новых высот, используя передовые технологии, экспертные знания и индивидуальный подход к
						каждому клиенту. Наша миссия — создавать цифровую экосистему, которая делает процессы более эффективными, а жизнь — проще.
					</div>
					<div className={classes.headlineText}>
						Корпоративный портал ORBITALIS — это современная информационная система, разработанная для удобства сотрудников и оптимизации внутренних
						процессов компании. Это единая платформа, которая объединяет все необходимые инструменты для эффективной работы и взаимодействия внутри
						организации.
					</div>
				</Space>
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
				<Carousel autoplay style={{height: "22.5em"}}>
					{newsList.map((e, i) => (
						<div key={i} className={classes.card}>
							<Space
								direction='vertical'
								className={classes.newCard}
								onClick={() => {
									setModalData(e)
									setModalActive(true)
								}}
							>
								<Space direction='vertical' style={{padding: "1em", width: "100%"}}>
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
													{e.headline && (
														<div className={classes.headline} style={{color: "black"}}>
															{e.headline}
														</div>
													)}
													{e.subheadline && <div className={classes.subheadline}>{e.subheadline}</div>}
												</Space>
											)}
										</Space>
									)}
								</Space>
							</Space>
						</div>
					))}
				</Carousel>
			</div>
			<Flex className={classes.right}>
				<Flex className={classes.block} vertical gap={"1em"}>
					<Flex className={classes.headline}>Руководители</Flex>
					<Flex wrap gap={"1em"}>
						{leaders.map((e, i) => (
							<Flex key={i} align='center' className={classes.blockInBlock}>
								<Avatar size={"large"} style={{backgroundColor: e?.color, minWidth: "40px"}} icon={<UserOutlined />} />
								<Flex vertical>
									<div className={classes.name}>{e?.name}</div>
									<div className={classes.job}>{e?.position}</div>
								</Flex>
							</Flex>
						))}
					</Flex>
				</Flex>
				<Flex className={classes.block} vertical gap={"1em"}>
					<Flex className={classes.headline}>Мероприятия</Flex>
					<Flex align='center' className={classes.event}>
						<FallOutlined className={classes.icon} />
						<Flex className={classes.title}>Анализ падения доходов в компании</Flex>
					</Flex>
					<Flex align='center' className={classes.event}>
						<RiseOutlined className={classes.icon} />
						<Flex className={classes.title}>Курс повышения квалификации</Flex>
					</Flex>
					<Flex align='center' className={classes.event}>
						<FundOutlined className={classes.icon} />
						<Flex className={classes.title}>Планирование графика работ</Flex>
					</Flex>
					<Flex align='center' className={classes.event}>
						<PieChartOutlined className={classes.icon} />
						<Flex className={classes.title}>Изучение доли расходов в компании по категориям</Flex>
					</Flex>
					<Flex align='center' className={classes.event}>
						<PieChartOutlined className={classes.icon} />
						<Flex className={classes.title}>Анализ классификаций в рабочее время</Flex>
					</Flex>
				</Flex>
				<Flex className={classes.block} vertical gap={"1em"}>
					<Carousel autoplay>
						<img className={classes.img} src='1.jpg' alt='' />
						<img className={classes.img} src='2.jpg' alt='' />
						<img className={classes.img} src='3.jpg' alt='' />
						<img className={classes.img} src='4.jpg' alt='' />
					</Carousel>
				</Flex>
			</Flex>
		</div>
	)
}
