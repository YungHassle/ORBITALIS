"use server"

import {cookies} from "next/headers"
import decrypt from "./decrypt"
import {getColl} from "_db"
import {ObjectId} from "mongodb"

export interface IUser {
	_id: string
	username: string
	name: string
	role?: string
}

export async function getUser(): Promise<IUser | null> {
	const token = cookies().get("token")?.value
	if (token) {
		const result = await decrypt(token)
		if (result.security) {
			const usersColl = await getColl("users")

			return JSON.parse(JSON.stringify(await usersColl.findOne({_id: new ObjectId(result.payload._id as string)}, {projection: {password: 0}})))
		}
	}

	return null
}
