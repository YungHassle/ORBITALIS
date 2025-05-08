"use server"

import {getColl} from "_db"
import {ObjectId} from "mongodb"

interface Task {
	_id?: string
	num: number
	name: string
	desc: string
	username: string
	userId: any
	type: string
	createdAt?: Date
	updatedAt?: Date
}

export async function createTask(taskData: Omit<Task, "_id">) {
	try {
		const tasks = await getColl("tasks")

		// Получаем последний номер задачи
		const lastTask = await tasks.find().sort({num: -1}).limit(1).next()
		const nextNum = lastTask ? lastTask.num + 1 : 1

		// Преобразуем userId в ObjectId
		const userId = new ObjectId(taskData.userId)

		const result = await tasks.insertOne({
			...taskData,
			userId, // Используем преобразованный ObjectId
			num: nextNum,
			createdAt: new Date(),
			updatedAt: new Date(),
			_id: new ObjectId(),
		})

		return {
			success: result.acknowledged,
			insertedId: result.insertedId.toString(),
			taskNum: nextNum,
		}
	} catch (error) {
		console.error("Error creating task:", error)
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		}
	}
}

export async function updateTask(id: string, taskData: Partial<Task>) {
	try {
		const tasks = await getColl("tasks")

		// Преобразуем userId в ObjectId, если он присутствует
		const updateData = {
			...taskData,
			updatedAt: new Date(),
		}

		if (taskData.userId) {
			updateData.userId = new ObjectId(taskData.userId)
		}

		const result = await tasks.updateOne({_id: new ObjectId(id)}, {$set: updateData})

		return {
			success: result.modifiedCount === 1,
			modifiedCount: result.modifiedCount,
		}
	} catch (error) {
		console.error("Error updating task:", error)
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		}
	}
}

export async function getTasks() {
	try {
		const tasks = await getColl("tasks")
		const taskList = await tasks.find().sort({num: -1}).toArray()

		return taskList.map((task) => ({
			...task,
			_id: task._id.toString(),
			createdAt: task.createdAt?.toISOString(),
			updatedAt: task.updatedAt?.toISOString(),
		}))
	} catch (error) {
		console.error("Error fetching tasks:", error)
		return []
	}
}

export async function deleteTask(taskId: string) {
	try {
		const tasks = await getColl("tasks")
		const result = await tasks.deleteOne({_id: new ObjectId(taskId)})
		return {
			success: result.deletedCount === 1,
			deletedCount: result.deletedCount,
		}
	} catch (error) {
		console.error("Error deleting task:", error)
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		}
	}
}

export async function getUsers() {
	try {
		const users = await getColl("users")
		const userList = await users.find().toArray()
		return userList.map((user) => ({
			...user,
			_id: user._id,
		}))
	} catch (error) {
		console.error("Error fetching users:", error)
		return []
	}
}
