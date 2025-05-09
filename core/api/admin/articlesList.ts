"use server"

import {getColl} from "_db"
import {ObjectId} from "mongodb"

export interface Article {
	_id: string
	name: string
	desc: string
	createdAt?: string
	updatedAt?: string
}

export async function createArticle(articleData: Omit<Article, "_id" | "num">) {
	try {
		const knowledge = await getColl("knowledge")

		const result = await knowledge.insertOne({
			...articleData,

			createdAt: new Date(),
			updatedAt: new Date(),
			_id: new ObjectId(),
		})

		return {
			success: result.acknowledged,
			insertedId: result.insertedId.toString(),
		}
	} catch (error) {
		console.error("Error creating article:", error)
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		}
	}
}

export async function updateArticle(id: string, articleData: Partial<Article>) {
	try {
		const knowledge = await getColl("knowledge")

		// Преобразуем userId в ObjectId, если он присутствует
		const updateData = {
			...articleData,
			updatedAt: new Date(),
		}

		const result = await knowledge.updateOne({_id: new ObjectId(id)}, {$set: updateData})

		return {
			success: result.modifiedCount === 1,
			modifiedCount: result.modifiedCount,
		}
	} catch (error) {
		console.error("Error updating article:", error)
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		}
	}
}

export async function getArticles() {
	try {
		const knowledge = await getColl("knowledge")
		const articleList = await knowledge.find().sort({_id: -1}).toArray()

		return articleList.map((article) => ({
			...article,
			_id: article._id.toString(),

			createdAt: article.createdAt?.toISOString(),
			updatedAt: article.updatedAt?.toISOString(),
		}))
	} catch (error) {
		console.error("Error fetching articles:", error)
		return []
	}
}

export async function deleteArticle(articleId: string) {
	try {
		const knowledge = await getColl("knowledge")
		const result = await knowledge.deleteOne({_id: new ObjectId(articleId)})
		return {
			success: result.deletedCount === 1,
			deletedCount: result.deletedCount,
		}
	} catch (error) {
		console.error("Error deleting article:", error)
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error",
		}
	}
}
