"use server"

import _ from "lodash"
import {jsonRequest} from "next-request-handler"
import {cookies} from "next/headers"

/**
 * Создание авторизованного запроса к втроенному API
 *
 * @async
 * @function apiLocalRequest
 * @param {string} path URL к встроенному API
 * @param {object} [query] Query объект
 * @param {object} [options] Параметры запроса
 * @param {("GET"|"HEAD"|"POST"|"PUT"|"DELETE"|"CONNECT"|"OPTIONS"|"TRACE"|"PATCH")} [options.method] Метод запроса
 * @param {object} [options.body] Тело запроса
 * @param {object} [options.headers] Заголовки запроса
 * @returns {Promise<object>}
 */
export async function apiLocalRequest(path: string, query?: any, options?: any) {
	if (!options) options = {}
	const Cookie = cookies()
		.getAll()
		.map((e) => e?.name + "=" + e?.value + ";path=/;expires=Session")
		.join(";")

	return jsonRequest(
		"http://localhost:" + process.env.PORT,
		`/api${path}`,
		query,
		{
			...options,
			headers: {
				...options.headers,
				Cookie,
			},
		},
		// @ts-ignore
		defaultCatcher,
	)
}

async function defaultCatcher(status: any, res: any, json: any) {
	switch (status) {
		case 401: {
			return true
		}

		default:
			throw new APIError(status, res.statusText, json) // createError(status, res.statusText, json)
	}
}

class APIError extends Error {
	private status: any
	constructor(status: any, res: any, json: any, ...params: any[]) {
		// @ts-ignore
		super(params)
		this.status = status
		this.message = res.statusText
		Object.keys(json ?? {}).forEach((e) => (this[e] = json[e]))
	}
}
