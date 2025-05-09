"use client"

import {Test} from "_api/admin/testsList"
import React, {useState} from "react"
import styles from "./page.module.scss"

export default function ClientPage({testsList}: {testsList: Test[]}) {
	const [tests, setTests] = useState<Test[]>(testsList)
	const [selectedTest, setSelectedTest] = useState<Test | null>(null)
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [answers, setAnswers] = useState<number[]>([])
	const [results, setResults] = useState<{correct: number; total: number} | null>(null)

	const startTest = (test: Test) => {
		setSelectedTest(test)
		setCurrentQuestionIndex(0)
		setAnswers(new Array(test.questions.length).fill(-1))
		setResults(null)
	}

	const handleAnswerSelect = (optionIndex: number) => {
		const newAnswers = [...answers]
		newAnswers[currentQuestionIndex] = optionIndex
		setAnswers(newAnswers)
	}

	const nextQuestion = () => {
		if (currentQuestionIndex < selectedTest!.questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1)
		}
	}

	const prevQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1)
		}
	}

	const submitTest = () => {
		if (!selectedTest) return

		let correct = 0
		selectedTest.questions.forEach((question, index) => {
			const userAnswerIndex = answers[index]
			if (userAnswerIndex !== -1 && question.options[userAnswerIndex].isCorrect) {
				correct++
			}
		})

		setResults({
			correct,
			total: selectedTest.questions.length,
		})
	}

	const resetTest = () => {
		setSelectedTest(null)
		setResults(null)
	}

	if (!selectedTest) {
		return (
			<div className={styles.testsContainer}>
				<h1 className={styles.testsTitle}>Доступные тесты</h1>
				<div className={styles.testsGrid}>
					{tests.map((test) => (
						<div key={test._id!.toString()} className={styles.testCard} onClick={() => startTest(test)}>
							<h2 className={styles.testCardTitle}>{test.title}</h2>
							<p className={styles.questionsCount}>{test.questions.length} вопросов</p>
						</div>
					))}
				</div>
			</div>
		)
	}

	if (results) {
		return (
			<div className={styles.resultsWrapper}>
				<div className={styles.resultsContainer}>
					<h2 className={styles.resultsTitle}>Результаты теста</h2>
					<h3 className={styles.testTitle}>{selectedTest.title}</h3>
					<div className={styles.score}>
						{results.correct} / {results.total}
					</div>
					<p className={styles.percentage}>{Math.round((results.correct / results.total) * 100)}% правильных ответов</p>
					<button onClick={resetTest} className={styles.returnButton}>
						Вернуться к списку тестов
					</button>
				</div>
			</div>
		)
	}

	const currentQuestion = selectedTest.questions[currentQuestionIndex]
	const isLastQuestion = currentQuestionIndex === selectedTest.questions.length - 1

	return (
		<div className={styles.testWrapper}>
			<div className={styles.testContent}>
				<div className={styles.testHeader}>
					<h2 className={styles.testName}>{selectedTest.title}</h2>
					<div className={styles.progress}>
						Вопрос {currentQuestionIndex + 1} из {selectedTest.questions.length}
					</div>
				</div>

				<div className={styles.questionBlock}>
					<h3 className={styles.questionText}>{currentQuestion.question}</h3>
					<div className={styles.optionsList}>
						{currentQuestion.options.map((option, index) => (
							<div
								key={index}
								className={`${styles.optionItem} ${answers[currentQuestionIndex] === index ? styles.selectedOption : ""}`}
								onClick={() => handleAnswerSelect(index)}
							>
								{option.text}
							</div>
						))}
					</div>
				</div>

				<div className={styles.navigationButtons}>
					<button onClick={prevQuestion} disabled={currentQuestionIndex === 0} className={`${styles.navButton} ${styles.prevButton}`}>
						Назад
					</button>
					{isLastQuestion ? (
						<button onClick={submitTest} disabled={answers[currentQuestionIndex] === -1} className={`${styles.navButton} ${styles.submitButton}`}>
							Завершить тест
						</button>
					) : (
						<button onClick={nextQuestion} disabled={answers[currentQuestionIndex] === -1} className={`${styles.navButton} ${styles.nextButton}`}>
							Далее
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
