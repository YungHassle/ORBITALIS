import createHttpError from "http-errors"
import {ObjectId} from "mongodb"

import {getColl} from "../db"
import decrypt from "./decrypt"

export default function middleware(needAuth) {
	return async (req, res, next) => {
		try {
			req.user = null
			if (req.cookies.get("_RR_TOKEN")) {
				let decryptedToken = await decrypt(req.cookies.get("_RR_TOKEN"))
				if (decryptedToken.security) {
					const coll = await getColl("users")
					const user = await coll.findOne({
						_id: new ObjectId(decryptedToken.payload._id),
					})
					if (user) {
						req.user = {...user}
					}
				}
			}
			if (req.user == null && needAuth) {
				return next(createHttpError(401))
			}
			next()
		} catch (error) {
			next(error)
		}
	}
}
