"use server"

import {getColl} from "_db"
import {ObjectId} from "mongodb"

export async function updateUser(id: string, name: string, birthdayAt: string | null, position: string) {
	try {
		const users = await getColl("users")

		const updateData = {
			name,
			position,
			updatedAt: new Date(),
			...(birthdayAt && {birthdayAt: new Date(birthdayAt)}),
		}

		const result = await users.updateOne({_id: new ObjectId(id)}, {$set: updateData})

		if (result.modifiedCount === 0) {
			return {error: "No changes were made"}
		}

		return {success: true}
	} catch (error) {
		console.error("Error updating user:", error)
		return {
			error: error instanceof Error ? error.message : "Unknown error",
		}
	}
}
