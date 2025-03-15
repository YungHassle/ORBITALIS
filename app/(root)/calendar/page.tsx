"use client"

import React, {useState, useEffect} from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import classes from "./page.module.scss"

const getHolidays = (year: number) => {
	return [
		`${year}-01-01`,
		`${year}-01-02`,
		`${year}-01-03`,
		`${year}-01-04`,
		`${year}-01-05`,
		`${year}-01-06`,
		`${year}-01-07`,
		`${year}-01-08`,
		`${year}-02-23`,
		`${year}-03-08`,
		`${year}-05-01`,
		`${year}-05-09`,
		`${year}-06-12`,
		`${year}-11-04`,
	]
}

export default function ClientPage() {
	const [date, setDate] = useState<any>(null)
	const [holidays, setHolidays] = useState<string[]>([])

	useEffect(() => {
		const currentDate = new Date()
		setDate(currentDate)
		// Получаем праздничные дни для текущего года
		setHolidays(getHolidays(currentDate.getFullYear()))
	}, [])

	// Функция для проверки, является ли день праздничным
	const isHoliday = (date: Date) => {
		const dateString = `${date.getFullYear()}-${date.getMonth() <= 8 ? "0" : ""}${date.getMonth() + 1}-${date.getDate() <= 9 ? "0" : ""}${date.getDate()}`
		return holidays.includes(dateString)
	}

	// Функция для определения, является ли день выходным или праздничным
	const isWeekendOrHoliday = (date: Date) => {
		const day = date.getDay()
		return day === 0 || day === 6 || isHoliday(date) // Суббота (6), Воскресенье (0) или праздник
	}

	// Функция для стилизации дней
	const tileClassName = ({date, view}: {date: Date; view: string}) => {
		if (view === "month") {
			if (isWeekendOrHoliday(date)) {
				return classes.holiday // Применяем стиль для выходных и праздничных дней
			}
			if (isWorkDay(date)) {
				return classes.workDay // Применяем стиль для рабочих дней
			}
		}
		return null
	}

	// Функция для определения, является ли день рабочим
	const isWorkDay = (date: Date) => {
		const day = date.getDay()
		return day !== 0 && day !== 6 && !isHoliday(date) // Не выходной и не праздник
	}

	return (
		<div className={classes.root}>
			<div className={classes.headlineText}>Календарь рабочих дней</div>
			{date && <Calendar onChange={(value) => setDate(value)} value={date} tileClassName={tileClassName} />}
		</div>
	)
}
