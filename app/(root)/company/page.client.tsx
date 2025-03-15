"use client"

import {Flex, Space} from "antd"
import classes from "./page.module.scss"

export default function ClientPage({}) {
	return (
		<div className={classes.root}>
			<Space className={classes.helloGuestsBlock} direction='vertical' size={30}>
				<img className={classes.imgLogo} src='orb2.jpg' alt='' />
				<div className={classes.headlineText}>
					ORBITALIS — это инновационная IT-компания, которая специализируется на предоставлении комплексных решений в области информационных
					технологий. Мы помогаем бизнесу достигать новых высот, используя передовые технологии, экспертные знания и индивидуальный подход к каждому
					клиенту. Наша миссия — создавать цифровую экосистему, которая делает процессы более эффективными, а жизнь — проще.
				</div>
				<div className={classes.headlineText}>
					С 2024 года ORBITALIS успешно реализует проекты в области разработки программного обеспечения, облачных решений, кибербезопасности,
					автоматизации бизнес-процессов и аналитики данных. Мы гордимся тем, что наши решения помогают компаниям оптимизировать работу, повышать
					продуктивность сотрудников и оставаться на шаг впереди конкурентов.
				</div>
				<div className={classes.headlineText}>
					Корпоративный портал ORBITALIS — это современная информационная система, разработанная для удобства сотрудников и оптимизации внутренних
					процессов компании. Это единая платформа, которая объединяет все необходимые инструменты для эффективной работы и взаимодействия внутри
					организации.
				</div>
				<Space direction='vertical' size={1}>
					<div className={classes.headlineText}>Инновации</div>
					<div>Мы всегда в поиске новых технологий и решений</div>
				</Space>
				<Space direction='vertical' size={1}>
					<div className={classes.headlineText}>Надежность</div>
					<div>Наши продукты и услуги работают без сбоев.</div>
				</Space>
				<Space direction='vertical' size={1}>
					<div className={classes.headlineText}>Клиентоориентированность</div>
					<div>Мы понимаем потребности бизнеса и предлагаем индивидуальные решения.</div>
				</Space>
				<Space direction='vertical' size={1}>
					<div className={classes.headlineText}>Команда</div>
					<div>Наши специалисты — это профессионалы с глубокими знаниями и страстью к своему делу.</div>
				</Space>
			</Space>
			<Space direction='vertical' className={classes.blockRight}>
				<Space className={classes.block} direction='vertical' size={20}>
					<Flex className={classes.headline}>Основные возможности портала</Flex>
					<Flex vertical>
						<div className={classes.point}>Новости компании</div>
						<div>
							Будьте в курсе последних событий! На портале публикуются актуальные новости, анонсы мероприятий и важные объявления. Это помогает
							сотрудникам оставаться в курсе изменений и инициатив компании.
						</div>
					</Flex>
					<Flex vertical>
						<div className={classes.point}>Сотрудники</div>
						<div>Удобный раздел с информацией о коллегах. Вы можете быстро найти контакты, узнать о роли и обязанностях других сотрудников.</div>
					</Flex>
					<Flex vertical>
						<div className={classes.point}>База знаний</div>
						<div>
							Централизованное хранилище информации, где собраны полезные материалы, инструкции, руководства и ответы на часто задаваемые вопросы.
							Это помогает сотрудникам быстро находить нужную информацию и решать задачи.
						</div>
					</Flex>
					<Flex vertical>
						<div className={classes.point}>Список задач</div>
						<div>Организуйте свою работу с помощью удобного планировщика задач. Вы можете создавать, назначать и отслеживать выполнение задач.</div>
					</Flex>
					<Flex vertical>
						<div className={classes.point}>Календарь рабочих дней</div>
						<div>Планируйте свое время с помощью корпоративного календаря. Здесь отмечены рабочие дни и праздники.</div>
					</Flex>
					<Flex vertical>
						<div className={classes.point}>Выбор отпуска</div>
						<div>Удобный инструмент для планирования отпуска. Сотрудники могут подать заявку на отпуск и согласовать даты с руководителем.</div>
					</Flex>
					<Flex vertical>
						<div className={classes.point}>Тестирование</div>
						<div>
							На портале доступны тесты для оценки знаний и навыков сотрудников. Это помогает выявлять сильные стороны и области для развития, а
							также поддерживать высокий уровень профессионализма в команде.
						</div>
					</Flex>
				</Space>
				<Space className={classes.block} direction='vertical' size={20}>
					<Flex className={classes.headline}>Преимущества корпоративного портала ORBITALIS</Flex>
					<Flex vertical>
						<div className={classes.point}>Удобство</div>
						<div>Все необходимые инструменты в одном месте.</div>
					</Flex>
					<Flex vertical>
						<div className={classes.point}>Эффективность</div>
						<div>Оптимизация процессов и экономия времени.</div>
					</Flex>
					<Flex vertical>
						<div className={classes.point}>Прозрачность</div>
						<div>Легкий доступ к информации и коммуникация внутри компании.</div>
					</Flex>
					<Flex vertical>
						<div className={classes.point}>Гибкость</div>
						<div>Возможность адаптации под потребности бизнеса.</div>
					</Flex>
				</Space>
			</Space>
		</div>
	)
}
