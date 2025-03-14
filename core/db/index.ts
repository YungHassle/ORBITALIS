import {Collection, Db, Document, MongoClient, ObjectId} from "mongodb"

export {ObjectId}

const client = new MongoClient(process.env.MONGO_URL as string)

export const collections = {
	temp: "temp",
	users: "users",
}

export type Coll = keyof typeof collections

const connection = client.connect()
const dbName = process.env.MONGO_DATABASE

export async function getDB(): Promise<Db> {
	await connection

	return client.db(dbName)
}

export async function getColl(coll: Coll): Promise<Collection<Document>> {
	await connection

	return client.db(dbName).collection(collections[coll] || coll)
}
