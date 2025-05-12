"use client"

import {createTest, deleteTest, getTests, Test, updateTest} from "_api/admin/testsList"
import {ObjectId} from "mongodb"
import React, {useState} from "react"
import styles from "./page.module.scss"
import {Button} from "antd"

const initialQuestion = {
	question: "",
	options: [
		{text: "", isCorrect: false},
		{text: "", isCorrect: false},
		{text: "", isCorrect: false},
		{text: "", isCorrect: false},
	],
}

export default function ClientPage({testsList}: {testsList: Test[]}) {
	const [tests, setTests] = useState<Test[]>(testsList)
	const [currentTest, setCurrentTest] = useState<Partial<Test>>({
		title: "",
		questions: [JSON.parse(JSON.stringify(initialQuestion))],
	})
	const [isEditing, setIsEditing] = useState(false)
	const [loading, setLoading] = useState(false)

	const fetchTests = async () => {
		setLoading(true)
		const response = await getTests()
		if (response.success) {
			setTests(response.data as any)
		}
		setLoading(false)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target
		setCurrentTest((prev) => ({...prev, [name]: value}))
	}

	const handleQuestionChange = (index: number, field: string, value: string) => {
		setCurrentTest((prev) => {
			const newQuestions = [...(prev.questions || [])]
			newQuestions[index] = {...newQuestions[index], [field]: value}
			return {...prev, questions: newQuestions}
		})
	}

	const handleOptionChange = (questionIndex: number, optionIndex: number, field: "text" | "isCorrect", value: string | boolean) => {
		setCurrentTest((prev) => {
			const newQuestions = [...(prev.questions || [])]
			const newOptions = [...newQuestions[questionIndex].options]
			newOptions[optionIndex] = {...newOptions[optionIndex], [field]: value}
			newQuestions[questionIndex] = {
				...newQuestions[questionIndex],
				options: newOptions,
			}
			return {...prev, questions: newQuestions}
		})
	}

	const addQuestion = () => {
		if (currentTest.questions && currentTest.questions.length < 10) {
			setCurrentTest((prev) => ({
				...prev,
				questions: [...(prev.questions || []), JSON.parse(JSON.stringify(initialQuestion))],
			}))
		}
	}

	const removeQuestion = (index: number) => {
		if (currentTest.questions && currentTest.questions.length > 1) {
			setCurrentTest((prev) => {
				const newQuestions = [...(prev.questions || [])]
				newQuestions.splice(index, 1)
				return {...prev, questions: newQuestions}
			})
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		try {
			if (isEditing && currentTest._id) {
				// Создаем полный объект теста для обновления
				const testToUpdate = {
					title: currentTest.title,
					questions: currentTest.questions,
				}

				const response = await updateTest(currentTest._id.toString(), testToUpdate)
				if (response.success) {
					await fetchTests()
					resetForm()
				} else {
					console.error("Failed to update test")
				}
			} else {
				// Создание нового теста
				const response = await createTest({
					title: currentTest.title || "",
					questions: currentTest.questions || [],
				})
				if (response.success) {
					await fetchTests()
					resetForm()
				} else {
					console.error("Failed to create test")
				}
			}
		} catch (error) {
			console.error("Error:", error)
		} finally {
			setLoading(false)
		}
	}

	const handleEdit = (test: Test) => {
		setCurrentTest({
			_id: test._id,
			title: test.title,
			questions: test.questions.map((q) => ({
				question: q.question,
				options: q.options.map((opt) => ({...opt})),
			})),
		})
		setIsEditing(true)
	}

	const handleDelete = async (id: ObjectId) => {
		if (window.confirm("Вы уверены, что хотите удалить этот тест?")) {
			setLoading(true)
			const response = await deleteTest(id.toString())
			if (response.success) {
				await fetchTests()
			}
			setLoading(false)
		}
	}

	const resetForm = () => {
		setCurrentTest({
			title: "",
			questions: [JSON.parse(JSON.stringify(initialQuestion))],
		})
		setIsEditing(false)
	}

	return (
		<div className={styles.container}>
			<h1 className={styles.header}>Управление тестами</h1>

			<div className={styles.gridContainer}>
				{/* Форма создания/редактирования */}
				<div className={styles.testForm}>
					<h2 className={styles.formTitle}>{isEditing ? "Редактировать тест" : "Создать новый тест"}</h2>
					<form onSubmit={handleSubmit}>
						<div className={styles.formGroup}>
							<label>Название теста:</label>
							<input type='text' name='title' value={currentTest.title || ""} onChange={handleInputChange} required />
						</div>

						<div className={styles.formGroup}>
							<label>Вопросы:</label>
							{currentTest.questions?.map((question, qIndex) => (
								<div key={qIndex} className={styles.questionBlock}>
									<div className={styles.questionHeader}>
										<h3>Вопрос {qIndex + 1}</h3>
										{currentTest.questions && currentTest.questions.length > 1 && (
											<button type='button' onClick={() => removeQuestion(qIndex)} className={styles.deleteQuestionBtn}>
												Удалить вопрос
											</button>
										)}
									</div>
									<div className={styles.formGroup}>
										<input
											type='text'
											value={question.question}
											onChange={(e) => handleQuestionChange(qIndex, "question", e.target.value)}
											placeholder='Текст вопроса'
											required
										/>
									</div>
									<div>
										<label>Варианты ответов:</label>
										{question.options.map((option, oIndex) => (
											<div key={oIndex} className={styles.optionItem}>
												<input
													type='text'
													value={option.text}
													onChange={(e) => handleOptionChange(qIndex, oIndex, "text", e.target.value)}
													placeholder='Вариант ответа'
													required
												/>
												<div className={styles.checkboxLabel}>
													<input
														type='checkbox'
														checked={option.isCorrect}
														onChange={(e) => handleOptionChange(qIndex, oIndex, "isCorrect", e.target.checked)}
													/>
													<span>Правильный</span>
												</div>
											</div>
										))}
									</div>
								</div>
							))}
							{currentTest.questions && currentTest.questions.length < 10 && (
								<button type='button' onClick={addQuestion} className={styles.addQuestionBtn}>
									+ Добавить вопрос
								</button>
							)}
						</div>

						<div className={styles.formActions}>
							<button type='submit' disabled={loading} className={`${styles.button} ${styles.submit}`}>
								{isEditing ? "Обновить" : "Создать"}
							</button>
							{isEditing && (
								<button type='button' onClick={resetForm} className={`${styles.button} ${styles.cancel}`}>
									Отмена
								</button>
							)}
						</div>
					</form>
				</div>

				{/* Список тестов */}
				<div className={styles.testsList}>
					<h2>Список тестов</h2>
					{loading ? (
						<p>Загрузка...</p>
					) : !Array.isArray(tests) || tests.length === 0 ? (
						<p>Тесты не найдены</p>
					) : (
						<div className={styles.testsContainer}>
							{tests.map((test) => (
								<div key={test._id!.toString()} className={styles.testCard}>
									<h3>{test.title}</h3>
									<div className={styles.questionsList}>
										{test.questions.map((question, qIndex) => (
											<div key={qIndex} className={styles.questionItem}>
												<h4>
													{qIndex + 1}. {question.question}
												</h4>
												<ul className={styles.optionsList}>
													{question.options.map((opt, oIndex) => (
														<li key={oIndex} className={opt.isCorrect ? styles.correctOption : ""}>
															{opt.text} {opt.isCorrect && "(Правильный)"}
														</li>
													))}
												</ul>
											</div>
										))}
									</div>
									<div className={styles.cardActions}>
										<Button onClick={() => handleEdit(test)} className={styles.editBtn}>
											Редактировать
										</Button>
										<Button danger onClick={() => handleDelete(test._id!)} className={styles.deleteBtn}>
											Удалить
										</Button>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
