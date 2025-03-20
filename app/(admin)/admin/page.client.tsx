"use client"

import classes from "./page.module.scss"
import {Avatar, Button, Flex, Space} from "antd"
import {useState} from "react"
import {FallOutlined, FundOutlined, PieChartOutlined, RiseOutlined, UserOutlined} from "@ant-design/icons"
import {getRandomColor} from "_utils/getRandomColor"

export default function ClientPage() {
	return (
		<div className={classes.root}>
			<div className={classes.left}>
				<Flex className={classes.helloGuestsBlock} wrap>
					<Flex align='center' className={classes.blockForAccept}>
						<Avatar size={"large"} style={{backgroundColor: getRandomColor()}} icon={<UserOutlined />} />
						<Flex vertical>
							<div className={classes.name}>Савина Варвара</div>
							<Button type='primary' size='small' className={classes.buttonAccept}>
								Принять
							</Button>
						</Flex>
					</Flex>
					<Flex align='center' className={classes.blockForAccept}>
						<Avatar size={"large"} style={{backgroundColor: getRandomColor()}} icon={<UserOutlined />} />
						<Flex vertical>
							<div className={classes.name}>Алексей Дмитриев</div>
							<Button type='primary' size='small' className={classes.buttonAccept}>
								Принять
							</Button>
						</Flex>
					</Flex>
					<Flex align='center' className={classes.blockForAccept}>
						<Avatar size={"large"} style={{backgroundColor: getRandomColor()}} icon={<UserOutlined />} />
						<Flex vertical>
							<div className={classes.name}>Александр Петров</div>
							<Button type='primary' size='small' className={classes.buttonAccept}>
								Принять
							</Button>
						</Flex>
					</Flex>
					<Flex align='center' className={classes.blockForAccept}>
						<Avatar size={"large"} style={{backgroundColor: getRandomColor()}} icon={<UserOutlined />} />
						<Flex vertical>
							<div className={classes.name}>Анастасия Смирнова</div>
							<Button type='primary' size='small' className={classes.buttonAccept}>
								Принять
							</Button>
						</Flex>
					</Flex>
					<Flex align='center' className={classes.blockForAccept}>
						<Avatar size={"large"} style={{backgroundColor: getRandomColor()}} icon={<UserOutlined />} />
						<Flex vertical>
							<div className={classes.name}>Юлия Кузнецова</div>
							<Button type='primary' size='small' className={classes.buttonAccept}>
								Принять
							</Button>
						</Flex>
					</Flex>
					<Flex align='center' className={classes.blockForAccept}>
						<Avatar size={"large"} style={{backgroundColor: getRandomColor()}} icon={<UserOutlined />} />
						<Flex vertical>
							<div className={classes.name}>Аня Смирнова</div>
							<Button type='primary' size='small' className={classes.buttonAccept}>
								Принять
							</Button>
						</Flex>
					</Flex>
					<Flex align='center' className={classes.blockForAccept}>
						<Avatar size={"large"} style={{backgroundColor: getRandomColor()}} icon={<UserOutlined />} />
						<Flex vertical>
							<div className={classes.name}>Анна Журавлева</div>
							<Button type='primary' size='small' className={classes.buttonAccept}>
								Принять
							</Button>
						</Flex>
					</Flex>
					<Flex align='center' className={classes.blockForAccept}>
						<Avatar size={"large"} style={{backgroundColor: getRandomColor()}} icon={<UserOutlined />} />
						<Flex vertical>
							<div className={classes.name}>Артем Чернов</div>
							<Button type='primary' size='small' className={classes.buttonAccept}>
								Принять
							</Button>
						</Flex>
					</Flex>
				</Flex>
			</div>
			<Flex className={classes.right}>
				<Flex className={classes.block} vertical gap={"1em"}>
					<Flex className={classes.headline}>Руководители</Flex>
					<Flex wrap gap={"1em"}>
						<Flex align='center' className={classes.blockInBlock}>
							<Avatar size={"large"} style={{backgroundColor: getRandomColor()}} icon={<UserOutlined />} />
							<Flex vertical>
								<div className={classes.name}>Савина Варвара</div>
								<div className={classes.job}>Технический директор</div>
							</Flex>
						</Flex>
						<Flex align='center' className={classes.blockInBlock}>
							<Avatar size={"large"} style={{backgroundColor: getRandomColor()}} icon={<UserOutlined />} />
							<Flex vertical>
								<div className={classes.name}>Худяков Пётр</div>
								<div className={classes.job}>Производственный директор</div>
							</Flex>
						</Flex>
						<Flex align='center' className={classes.blockInBlock}>
							<Avatar size={"large"} style={{backgroundColor: getRandomColor()}} icon={<UserOutlined />} />
							<Flex vertical>
								<div className={classes.name}>Павлов Мирон</div>
								<div className={classes.job}>Генеральный директор</div>
							</Flex>
						</Flex>
						<Flex align='center' className={classes.blockInBlock}>
							<Avatar size={"large"} style={{backgroundColor: getRandomColor()}} icon={<UserOutlined />} />
							<Flex vertical>
								<div className={classes.name}>Степанова Алиса</div>
								<div className={classes.job}>Менеджер</div>
							</Flex>
						</Flex>
						<Flex align='center' className={classes.blockInBlock}>
							<Avatar size={"large"} style={{backgroundColor: getRandomColor()}} icon={<UserOutlined />} />
							<Flex vertical>
								<div className={classes.name}>Романов Дмитрий</div>
								<div className={classes.job}>Менеджер</div>
							</Flex>
						</Flex>
						<Flex align='center' className={classes.blockInBlock}>
							<Avatar size={"large"} style={{backgroundColor: getRandomColor()}} icon={<UserOutlined />} />
							<Flex vertical>
								<div className={classes.name}>Смирнова Александра</div>
								<div className={classes.job}>Менеджер</div>
							</Flex>
						</Flex>
						<Flex align='center' className={classes.blockInBlock}>
							<Avatar size={"large"} style={{backgroundColor: getRandomColor()}} icon={<UserOutlined />} />
							<Flex vertical>
								<div className={classes.name}>Винокуров Александр</div>
								<div className={classes.job}>Менеджер</div>
							</Flex>
						</Flex>
						<Flex align='center' className={classes.blockInBlock}>
							<Avatar size={"large"} style={{backgroundColor: getRandomColor()}} icon={<UserOutlined />} />
							<Flex vertical>
								<div className={classes.name}>Басова Мария</div>
								<div className={classes.job}>Менеджер</div>
							</Flex>
						</Flex>
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
				</Flex>
			</Flex>
		</div>
	)
}
