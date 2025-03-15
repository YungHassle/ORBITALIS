"use client"

import classes from "./page.module.scss"
import {Avatar, Carousel, Divider, Flex, Modal, Space, Tag} from "antd"
import {useState} from "react"
import {FallOutlined, FundOutlined, PieChartOutlined, RadarChartOutlined, RiseOutlined, UserOutlined} from "@ant-design/icons"
import {getRandomColor} from "_utils/getRandomColor"

export default function ClientPage() {
	const user = {_id: "222"}
	const [items, setItems] = useState<any>([])

	const [modalActive, setModalActive] = useState(false)
	const [modalData, setModalData] = useState<any>({})
	const news = [
		{
			tags: [{type: "default", text: "Новость"}],
			endedAt: "2026-01-15T04:03:46.654+00:00",
			createdAt: "2025-01-15T04:03:46.654+00:00",
			headline: "«Ростелеком» и МГПУ объединяют усилия в области развития искусственного интеллекта",
			subheadline:
				"Соглашение подписано в рамках реализации программы МГПУ «Приоритет 2030». Оно объединит ресурсы ведущего ИТ-игрока и системообразующего университета. Результаты совместных разработок будут способствовать улучшению качества образования и подготовке квалифицированных кадров в области педагогики и информационных технологий.",
			description: [
				{
					type: "text",
					title: "«Ростелеком» и Московский городской педагогический университет (МГПУ) заключили соглашение о сотрудничестве в области исследований и разработок, связанных с внедрением технологий искусственного интеллекта (ИИ) в образовательный процесс.",
				},
				{
					type: "text",
					title: "Торжественное подписание прошло 6 марта 2025 года на полях флагманской кросс-отраслевой конференции Ассоциации крупнейших потребителей программного обеспечения и оборудования (АКПО). Подписи под документом поставили Дарий Халитов, заместитель президента — председателя правления «Ростелекома», и Игорь Реморенко, ректор Московского городского педагогического университета.",
				},
				{
					type: "text",
					title: "Сотрудничество «Ростелекома» и МГПУ предполагает разработку инновационных интеллектуальных систем для сферы образования. Оно будет включать внедрение ИИ-систем для персонализации образовательного процесса, создание инструментов для анализа больших объемов данных в области педагогики и психологии, а также исследование возможностей ИИ-инструментов для повышения эффективности работы учебных заведений.",
				},
			],
		},
		{
			tags: [
				{type: "danger", text: "Внимание"},
				{type: "warning", text: "Осторожно"},
			],
			createdAt: "2025-01-14T04:03:46.654+00:00",
			headline: "В России появится индекс безопасности детства в цифровой среде",
			subheadline:
				"Альянс по защите детей в цифровой среде, одним из основателей которого выступает «Ростелеком», разработает «Индекс безопасности детства в цифровой среде» — аналитический инструмент для мониторинга угроз и оценки эффективности мер по защите несовершеннолетних в интернете. Индекс позволит государственным, общественным и коммерческим организациям объединить усилия и скоординировать подход к созданию безопасной и комфортной онлайн-среды для детей и подростков.",
			description: [
				{
					type: "text",
					title: "Семейство индексов, разрабатываемых Альянсом по защите детей в цифровой среде совместно с аналитической компанией MINDSMITH, будет учитывать данные об актуальных угрозах, уровень цифровой грамотности, степень удовлетворенности технологическими решениями по обеспечению онлайн-безопасности и другие параметры.",
				},
				{
					type: "text",
					title: "На данный момент завершен первый этап исследования: обзор и систематизация информации о структурах, занимающихся вопросами безопасности детей в интернете: от государственных органов до некоммерческих организаций. Исследователи проанализировали более 200 российских организаций и 500 инициатив, связанных с защитой детей в Сети. На основе этих данных была составлена «карта стейкхолдеров», в которой выделено 13 типов заинтересованных сторон, объединенных в четыре кластера: государственный, коммерческий, академический и образовательный, а также общественные инициативы и СМИ.",
				},
				{
					type: "text",
					title: "Каждый кластер выполняет специфические функции в области цифровой безопасности детей, однако работа стейкхолдеров зачастую фрагментирована и не приводит к комплексным решениям. Создание индекса — важный шаг к слаженной и комплексной защите детей в цифровом пространстве.",
				},
				{
					type: "text",
					title: "Согласно данным социологического исследования Альянса по защите детей в цифровой среде за 2023 год, 96% подростков в России сталкивались с цифровыми угрозами, причем около 30% родителей и детей испытывали недостаток информации о том, как реагировать на цифровые угрозы. Исследователи отмечают, что отсутствие в школах и вузах обязательного курса по цифровой безопасности, лишает подростков системных знаний и делает их особенно уязвимыми в Сети.",
				},
				{
					type: "text",
					title: "Альянс по защите детей в цифровой среде планирует привлекать ведущие ИТ-компании, государственные институты и образовательные учреждения к созданию устойчивой системы мониторинга и координации в области детской безопасности в интернете.",
				},
			],
		},
		{
			tags: [{type: "default", text: "Финансы"}],
			endedAt: "2025-01-15T04:03:46.654+00:00",
			createdAt: "2024-01-15T04:03:46.654+00:00",
			headline: "Финансовые и операционные результаты деятельности «Ростелекома» за IV квартал и 12 месяцев 2024 г.",
			subheadline: "Выручка за IV квартал 2024 г. выросла на 12%, OIBDA[1] — на 8%, чистая прибыль — в два с половиной раза.",
			description: [
				{
					type: "text",
					title: "«Ростелеком в целом успешно завершил 2024 год, показав двухзначные темпы роста выручки и добившись увеличения операционной прибыли до амортизации. Основные драйверы роста компании — сервисы мобильной связи и цифровые инновационные продукты. В 2024 году вклад цифровой линейки сервисов в выручку компании превысил 23%, а масштаб цифрового бизнеса в абсолютном выражении приблизился к внушительной отметке 200 млрд рублей.",
				},
				{
					type: "text",
					title: "Прошедший год ознаменовался важными изменениями в нашем бизнесе. Мы создали коммерческий ИТ-кластер, который объединил экспертизу и передовые технологические разработки дочерних ИТ-компаний, предназначенные для широкого круга внешних заказчиков. Провели ребрендинг Tele2 вслед за внутренними изменениями — компания сменила название на Т2, нарастила абонентскую базу почти до 50 млн клиентов и сохранила за собой лидерские позиции на рынке мобильной связи по качеству взаимодействия с абонентами. Целенаправленно развивали онлайн-кинотеатр Wink — обогатили платформу не только новыми оригинальными сериалами, но и музыкальным сервисом. За год Wink зафиксировал, что его контент в совокупности смотрели с почти 45 млн уникальных устройств — это на треть больше, чем годом ранее.",
				},
				{
					type: "text",
					title: "В 2024 году “Ростелеком” продолжил укреплять позиции безусловного лидера на рынке коммерческих дата-центров и облачных инфраструктурных сервисов. Мы существенно расширили собственную сеть центров обработки данных, чтобы удовлетворить растущий спрос со стороны корпоративных и государственных заказчиков, которые все чаще выбирают облачные решения профильного провайдера взамен создания собственных дата-центров. По итогам 2024 года количество стойко-мест в дата-центрах группы выросло почти на четверть, превысив 26 тыс. Мы продолжаем фиксировать стремительно растущий спрос на облачные решения, в том числе в сфере VDI и серверной виртуализации. Компания “Базис”, наш разработчик и крупнейший игрок на российском рынке виртуализации, первой в стране представила полностью импортонезависимую экосистему решений для виртуализации ИТ-инфраструктуры. На ее базе реализованы амбициозные проекты в банковской отрасли: в короткие сроки в инфраструктуре двух системообразующих российских банков иностранные решения были заменены на платформу виртуализации серверов Basis Dynamix и платформу виртуализации рабочих мест Basis Workplace.",
				},
				{
					type: "text",
					title: "Под брендом “Солар” активно развивался кластер информационной безопасности в условиях роста количества и масштаба киберугроз. Помимо обновления флагманских продуктов в сфере кибербезопасности в 2024 году компания представила новые комплексные решения собственной разработки для надежной защиты данных и ИТ-инфраструктур. Появился новый программный межсетевой экран ПАК Solar NGFW, который осуществляет комплексную защиту от сетевых атак и вредоносного ПО, а также обеспечивает управление доступом к веб-ресурсам. Для защиты онлайн-ресурсов среднего и малого бизнеса вывели на рынок облачную платформу Solar Space, а крупным корпорациям и госструктурам, которые уже имеют собственные центры мониторинга ИБ, предложили сервис оценки зрелости Security Operations Center (SOC) для определения основных направлений их развития. Благодаря усилиям команды “Солара” был обеспечен опережающий рынок темп роста бизнеса кибербеза: в полтора раза выросла выручка по данному направлению, а клиентская база превысила 1 000 компаний.",
				},
			],
		},
		{
			endedAt: "2026-02-15T04:03:46.654+00:00",
			createdAt: "2025-01-15T04:03:46.654+00:00",
			headline: "«Ростелеком» поможет компьютерным клубам развить киберскорость",
			subheadline:
				"«Ростелеком» объявил о запуске тарифных планов на интернет, разработанных специально для киберклубов. Интернет для компьютерных и игровых клубов и киберарен от «Ростелекома» обеспечивает быструю скорость передачи данных, высокое разрешение, отсутствие задержек и надежное соединение, отвечая всем требованиям любителей гейминга и киберспорта. Новая линейка тарифов дает возможность подключить интернет скоростью до 2 Гбит/с и получить специальное предложение при приобретении годового плана.",
			description: [
				{
					type: "text",
					title: "Популярность компьютерных и игровых клубов в России в последние годы возросла. По оценке Ассоциации развития киберспортивной инфраструктуры, их число увеличилось не только в Москве и Санкт-Петербурге (прирост по сравнению с прошлым годом составил 17% и 23% соответственно), более двух третей таких пространств расположены именно в регионах, за пределами крупных городов. Кроме того, компьютерные клубы становятся быстрорастущим направлением в сегменте малого и среднего бизнеса. Лояльная аудитория и устойчивый интерес к киберспорту создают новые возможности для предпринимателей, позволяя им не только выйти на рынок, но и успешно конкурировать в этой динамично развивающейся индустрии.",
				},
				{
					type: "text",
					title: "«Сегодня киберклубы — это не просто место для развлечений, но и важный центр для развития киберспорта. Для многих киберспортсменов, в том числе, в регионах, — это единственная возможность получить доступ к мощному игровому оборудованию и высокоскоростному интернету. Мы создали новые тарифы, чтобы поддержать владельцев компьютерных клубов и помочь им предоставлять своим посетителям только лучшее качество подключения, необходимое для проведения масштабных игр и турниров, и сделать киберспорт более доступным по всей стране».",
				},
				{type: "text", title: "Новые тарифы уже подключили владельцы компьютерных клубов и киберарен в 40 регионах России."},
			],
		},
	]

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
	}

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
						{modalData?.tags ? (
							<Space className={classes.goodTags}>
								{modalData?.tags.map((e1, i1) => (
									<Tag key={i1} color={e1.type == "danger" ? "red" : e1.type == "warning" ? "orange" : "green"}>
										{e1.text}
									</Tag>
								))}
							</Space>
						) : (
							<Space className={classes.goodTags}>
								<Tag color={"green"}>Новость</Tag>
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
						{modalData?.img && (
							<div className={classes.banner}>
								<img src={modalData?.img} />
							</div>
						)}
						{modalData?.description && <Divider />}
						{modalData?.description && (
							<Space direction='vertical'>
								{modalData?.description.map((e1, i1) => (
									<>
										{e1.type == "text" && (
											<Space direction='vertical' key={i1}>
												<div>{e1.title}</div>
												{e1.desc &&
													e1.desc.map((e2, i2) => (
														<div key={i2} className={classes.descForText}>
															{e2}
														</div>
													))}
											</Space>
										)}
										{e1.type == "img" && (
											<div className={classes.banner}>
												<img src={e1.img} />
											</div>
										)}
									</>
								))}
							</Space>
						)}
					</Space>
				</Modal>
				<Carousel autoplay style={{height: "22.5em"}}>
					{news.map((e, i) => (
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
									{e.tags ? (
										<Space className={classes.goodTags}>
											{e.tags.map((e1, i1) => (
												<Tag key={i1} color={e1.type == "danger" ? "red" : e1.type == "warning" ? "orange" : "green"}>
													{e1.text}
												</Tag>
											))}
										</Space>
									) : (
										<Space className={classes.goodTags}>
											<Tag color={"green"}>Новость</Tag>
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
						</div>
					))}
				</Carousel>
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
