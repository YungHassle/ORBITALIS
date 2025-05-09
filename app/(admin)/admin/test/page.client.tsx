"use client"

import {createTest, deleteTest, getTests, TestQuestion, updateTest} from "_api/admin/testsList"
import {ObjectId} from "mongodb"
import React, {useState, useEffect} from "react"

export default function ClientPage({testsList}: any) {
	const [tests, setTests] = useState<TestQuestion[]>(testsList)
	const [currentTest, setCurrentTest] = useState<Partial<TestQuestion>>({
		question: "",
		options: [
			{text: "", isCorrect: false},
			{text: "", isCorrect: false},
			{text: "", isCorrect: false},
			{text: "", isCorrect: false},
		],
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

	const handleOptionChange = (index: number, field: "text" | "isCorrect", value: string | boolean) => {
		setCurrentTest((prev) => {
			const newOptions = [...prev.options!]
			newOptions[index] = {...newOptions[index], [field]: value}
			return {...prev, options: newOptions}
		})
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		if (isEditing && currentTest._id) {
			const response = await updateTest(currentTest._id.toString(), currentTest)
			if (response.success) {
				await fetchTests()
				resetForm()
			}
		} else {
			const response = await createTest(currentTest as Omit<TestQuestion, "_id" | "createdAt" | "updatedAt">)
			if (response.success) {
				await fetchTests()
				resetForm()
			}
		}

		setLoading(false)
	}

	const handleEdit = (test: TestQuestion) => {
		setCurrentTest({
			_id: test._id,
			question: test.question,
			options: test.options.map((opt) => ({...opt})), // полная копия массива
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
			question: "",
			options: [
				{text: "", isCorrect: false},
				{text: "", isCorrect: false},
				{text: "", isCorrect: false},
				{text: "", isCorrect: false},
			],
		})
		setIsEditing(false)
	}

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-6'>Управление тестами</h1>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				{/* Форма создания/редактирования */}
				<div className='bg-white p-6 rounded-lg shadow-md'>
					<h2 className='text-xl font-semibold mb-4'>{isEditing ? "Редактировать тест" : "Создать новый тест"}</h2>
					<form onSubmit={handleSubmit}>
						<div className='mb-4'>
							<label className='block text-gray-700 mb-2'>Вопрос:</label>
							<input
								type='text'
								name='question'
								value={currentTest.question || ""}
								onChange={handleInputChange}
								className='w-full p-2 border rounded'
								required
							/>
						</div>

						<div className='mb-4'>
							<label className='block text-gray-700 mb-2'>Варианты ответов:</label>
							{currentTest.options?.map((option, index) => (
								<div key={index} className='mb-2 flex items-center'>
									<input
										type='text'
										value={option.text}
										onChange={(e) => handleOptionChange(index, "text", e.target.value)}
										className='flex-1 p-2 border rounded mr-2'
										required
									/>
									<input
										type='checkbox'
										checked={option.isCorrect}
										onChange={(e) => handleOptionChange(index, "isCorrect", e.target.checked)}
										className='h-5 w-5'
									/>
									<span className='ml-1'>Правильный</span>
								</div>
							))}
						</div>

						<div className='flex space-x-2'>
							<button
								type='submit'
								disabled={loading}
								className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300'
							>
								{isEditing ? "Обновить" : "Создать"}
							</button>
							{isEditing && (
								<button type='button' onClick={resetForm} className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'>
									Отмена
								</button>
							)}
						</div>
					</form>
				</div>
				<div>
					<h2 className='text-xl font-semibold mb-4'>Список тестов</h2>
					{loading ? (
						<p>Загрузка...</p>
					) : !Array.isArray(tests) || tests.length === 0 ? (
						<p>Тесты не найдены</p>
					) : (
						<div className='space-y-4'>
							{tests &&
								tests?.map((test) => (
									<div key={test._id!.toString()} className='bg-white p-4 rounded-lg shadow'>
										<h3 className='font-medium'>{test.question}</h3>
										<ul className='mt-2 ml-4 list-disc'>
											{test.options.map((opt, i) => (
												<li key={i} className={opt.isCorrect ? "text-green-600" : ""}>
													{opt.text} {opt.isCorrect && "(Правильный)"}
												</li>
											))}
										</ul>
										<div className='mt-2 flex space-x-2'>
											<button onClick={() => handleEdit(test)} className='text-blue-500 hover:text-blue-700'>
												Редактировать
											</button>
											<button onClick={() => handleDelete(test._id!)} className='text-red-500 hover:text-red-700'>
												Удалить
											</button>
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
