"use server"

import {getColl} from "_db"
import {ObjectId} from "mongodb"

interface NewsData {
	headline: string
	subheadline?: string
	description?: string
	tags?: string[]
	endedAt?: Date | string
}

export async function createNews(newsData: NewsData) {
	try {
		const news = await getColl("news")

		const dataToInsert = {
			...newsData,
			createdAt: new Date(),
			updatedAt: new Date(),
			_id: new ObjectId(),
		}

		if (newsData.endedAt) {
			dataToInsert.endedAt = new Date(newsData.endedAt)
		}

		const result = await news.insertOne(dataToInsert)

		return {
			success: result.acknowledged,
			insertedId: result.insertedId.toString(),
		}
	} catch (error) {
		console.error("Error creating news:", error)
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		}
	}
}

export async function updateNews(id: string, newsData: NewsData) {
	try {
		const news = await getColl("news")

		const updateData = {
			...newsData,
			updatedAt: new Date(),
		}

		if (newsData.endedAt) {
			updateData.endedAt = new Date(newsData.endedAt)
		}

		const result = await news.updateOne({_id: new ObjectId(id)}, {$set: updateData})

		return {
			success: result.modifiedCount === 1,
			modifiedCount: result.modifiedCount,
		}
	} catch (error) {
		console.error("Error updating news:", error)
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		}
	}
}

export async function getNewsList() {
	try {
		const news = await getColl("news")
		const newsList = await news.find().sort({createdAt: -1}).toArray()

		return newsList.map((item) => ({
			...item,
			_id: item._id.toString(),
			createdAt: item.createdAt.toISOString(),
			updatedAt: item.updatedAt.toISOString(),
			endedAt: item.endedAt ? item.endedAt.toISOString() : null,
		}))
	} catch (error) {
		console.error("Error fetching news:", error)
		return []
	}
}

export async function deleteNews(newsId: string) {
	try {
		const news = await getColl("news")
		const result = await news.deleteOne({_id: new ObjectId(newsId)})
		return {
			success: result.deletedCount === 1,
			deletedCount: result.deletedCount,
		}
	} catch (error) {
		console.error("Error deleting news:", error)
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		}
	}
}
