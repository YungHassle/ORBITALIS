import {RequestHandler} from "_utils/handler"
import {StreamTelecom} from "stream-telecom"
import {getColl} from "../../../core/db"
import createHttpError from "http-errors"
import crypt from "_utils/crypt"

const handler = RequestHandler()

handler.post(async (req) => {
	const {phone, code, stage} = req.query

	if (!stage) throw createHttpError(400, "stage is required")

	const coll = await getColl("users")

	if (stage == "phone") {
		if (!phone) throw createHttpError(400, "phone is required")
		let code = process.env.NODE_ENV == "production" && process.env.SMS_LOGIN ? undefined : "0000"

		if (process.env.NODE_ENV == "production" && process.env.SMS_LOGIN) {
			const res = await new StreamTelecom({
				login: process.env.SMS_LOGIN as string,
				password: process.env.SMS_PASS as string,
			}).FlashCall.flash({
				phone: (phone as string).replace(/\+\(\)\-/g, ""),
				code_gen: true,
				sms_originator: process.env.SMS_NAME,
				sms_text: "#code# - код для входа в ORBITALIS.",
			})
			if (res.result == "Success") code = res.code
		}

		if (!code) throw createHttpError(500, "Failed to send code")
		await coll.updateOne({phone}, {$set: {code}, $currentDate: {codeAt: true}, $setOnInsert: {createdAt: new Date()}}, {upsert: true})

		console.info("Code for", phone, "is:", code)
		return {success: true}
	}
	if (stage == "code") {
		if (!code) throw createHttpError(400, "code is required")
		const user = await coll.findOne({phone})
		if (!user) throw createHttpError(400, "user not found")
		if (user.code != code) throw createHttpError(400, "code is wrong")
		if (user.codeAt.getTime() + 60 * 1000 < new Date().getTime()) throw createHttpError(400, "code is expired")
		coll.updateOne({phone}, {$unset: {code: true, codeAt: true}})
		// @ts-ignore
		req.cookies.set(
			"_s_au",
			crypt({
				_id: user._id.toString(),
				maxAge: 60 * 60 * 24 * 30 * 1000,
				createAt: Date.now(),
			}),
			{
				maxAge: 60 * 60 * 24 * 30 * 1000,
			},
		)
		return {success: true}
	}
	return
})

export default handler.handle
