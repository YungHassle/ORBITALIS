"use client"

import {Divider, Modal, Space, Tag} from "antd"
import classes from "./page.module.scss"
import {useState} from "react"

export default function ClientPage({newsList}) {
	const [modalActive, setModalActive] = useState(false)
	const [modalData, setModalData] = useState<any>({})

	return (
		<div className={classes.root}>
			{newsList?.map((e, i) => (
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
		</div>
	)
}
