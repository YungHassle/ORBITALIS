"use server"

import {getColl} from "_db"
import {ObjectId} from "mongodb"

export interface TestOption {
	text: string
	isCorrect: boolean
}

export interface TestQuestion {
	question: string
	options: TestOption[]
}

export interface Test {
	_id?: ObjectId
	title: string
	questions: TestQuestion[]
	createdAt?: Date
	updatedAt?: Date
}

export async function getTests() {
	try {
		const testsCollection = await getColl("tests")
		const tests = await testsCollection.find().toArray()
		return {success: true, data: tests}
	} catch (error) {
		console.error("Error fetching tests:", error)
		return {success: false, error: error instanceof Error ? error.message : "Unknown error"}
	}
}

export async function createTest(testData: Omit<Test, "_id" | "createdAt" | "updatedAt">) {
	try {
		const testsCollection = await getColl("tests")
		const newTest = {
			...testData,
			createdAt: new Date(),
			updatedAt: new Date(),
		}
		const result = await testsCollection.insertOne(newTest)
		return {success: true, id: result.insertedId}
	} catch (error) {
		console.error("Error creating test:", error)
		return {success: false, error: error instanceof Error ? error.message : "Unknown error"}
	}
}

export async function updateTest(id: string, testData: Partial<Test>) {
	try {
		const testsCollection = await getColl("tests")
		const updateData = {
			title: testData.title,
			questions: testData.questions,
			updatedAt: new Date(),
		}

		const result = await testsCollection.updateOne({_id: new ObjectId(id)}, {$set: updateData})
		return {
			success: result.modifiedCount === 1,
			modifiedCount: result.modifiedCount,
		}
	} catch (error) {
		console.error("Error updating test:", error)
		return {success: false, error: error instanceof Error ? error.message : "Unknown error"}
	}
}

export async function deleteTest(id: string) {
	try {
		const testsCollection = await getColl("tests")
		const result = await testsCollection.deleteOne({_id: new ObjectId(id)})
		return {success: result.deletedCount === 1}
	} catch (error) {
		console.error("Error deleting test:", error)
		return {success: false, error: error instanceof Error ? error.message : "Unknown error"}
	}
}
