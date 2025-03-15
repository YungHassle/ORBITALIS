// @ts-nocheck
"use client"

import {notification} from "antd"
import _ from "lodash"
import {jsonRequest} from "next-request-handler"

/**
 * Создание авторизованного запроса к втроенному API
 *
 * @async
 * @function apiRequest
 * @param {string} path URL к встроенному API
 * @param {object} [query] Query объект
 * @param {object} [options] Параметры запроса
 * @param {("GET"|"HEAD"|"POST"|"PUT"|"DELETE"|"CONNECT"|"OPTIONS"|"TRACE"|"PATCH")} [options.method] Метод запроса
 * @param {object} [options.body] Тело запроса
 * @param {object} [options.headers] Заголовки запроса
 * @returns {Promise<object>}
 */
export async function apiRequest(path, query?, options = {}) {
	return jsonRequest(
		window.location.origin,
		`/api${path}`,
		query,
		{
			...options,
			headers: {
				...options.headers,
			},
			...(["POST", "PUT", "PATCH", "DELETE"].includes((options.method || "GET")?.toUpperCase()) ? {body: options.body ?? {}} : {}),
			credentials: "include",
		},
		defaultCatcher,
	)
}

async function defaultCatcher(status, res, json) {
	switch (status) {
		case 401: {
			if (location) {
				if (!location.pathname.includes("/auth")) return location.replace("/auth?redirectURL=" + location.pathname + location.search)
			}
			return
		}

		default:
			return new APIError(status, res.statusText, json) // createError(status, res.statusText, json)
	}
}

class APIError extends Error {
	constructor(status, res, json, ...params) {
		super(params)
		this.status = status
		this.message = res.statusText
		Object.keys(json ?? {}).forEach((e) => (this[e] = json[e]))
	}
}
