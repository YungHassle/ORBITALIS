"use server"

import {Collection, Db, Document, MongoClient} from "mongodb"

const client = new MongoClient(process.env.MONGO_URL as string)

const connection = client.connect()
const dbName = process.env.MONGO_DATABASE

;(async () => {
	const usersColl = await getColl("users")
	usersColl.createIndex({username: 1}, {unique: true})
})()

export async function getDB(): Promise<Db> {
	await connection

	return client.db(dbName)
}

export async function getColl(coll: string): Promise<Collection<Document>> {
	await connection

	return client.db(dbName).collection(coll)
}
