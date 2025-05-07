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

export async function acceptUser(userId: string) {
	const users = await getColl("users")

	const result = await users.updateOne({_id: new ObjectId(userId)}, {$set: {accept: true}})

	return {
		success: result.modifiedCount === 1,
		modifiedCount: result.modifiedCount,
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
