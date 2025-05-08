"use server"

import {getColl} from "_db"
import {ObjectId} from "mongodb"

export async function getUsersWithoutAccept() {
	const users = await getColl("users")

	const usersWithoutAccept = await users
		.find({
			$or: [{accept: {$exists: false}}, {accept: {$ne: true}}],
		})
		.toArray()

	return usersWithoutAccept
}

export async function getUsersWithAccept() {
	const users = await getColl("users")

	const usersWithoutAccept = await users
		.find({
			$or: [{accept: {$exists: true}, leader: {$exists: false}}],
		})
		.toArray()

	return usersWithoutAccept
}

export async function acceptUser(userId: string) {
	const users = await getColl("users")

	const result = await users.updateOne({_id: new ObjectId(userId)}, {$set: {accept: true}})

	return {
		success: result.modifiedCount === 1,
		modifiedCount: result.modifiedCount,
	}
}

export async function deleteUser(userId: string) {
	const users = await getColl("users")

	const result = await users.deleteOne({_id: new ObjectId(userId)})

	return {
		success: result.deletedCount === 1,
		modifiedCount: result.deletedCount,
	}
}

export async function getUsersLeadersList() {
	const users = await getColl("users")

	const usersWithoutAccept = await users
		.find({
			$or: [{leader: {$exists: true}}],
		})
		.toArray()

	return usersWithoutAccept
}

// Добавление руководителя
export async function addLeader(userId: string) {
	try {
		const users = await getColl("users")

		const result = await users.updateOne({_id: new ObjectId(userId)}, {$set: {leader: true}})

		return {
			success: result.modifiedCount === 1,
			modifiedCount: result.modifiedCount,
		}
	} catch (error) {
		console.error("Error adding leader:", error)
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		}
	}
}

// Удаление руководителя
export async function removeLeader(userId: string) {
	try {
		const users = await getColl("users")

		const result = await users.updateOne({_id: new ObjectId(userId)}, {$unset: {leader: ""}})

		return {
			success: result.modifiedCount === 1,
			modifiedCount: result.modifiedCount,
		}
	} catch (error) {
		console.error("Error removing leader:", error)
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		}
	}
}
