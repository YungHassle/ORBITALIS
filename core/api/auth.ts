"use server"

import {getColl} from "_db"
import crypt from "_utils/crypt"
import decrypt from "_utils/decrypt"
import bcrypt from "bcrypt"
import {cookies} from "next/headers"

export async function getAuth() {
	const token = cookies().get("token")?.value
	if (token) {
		const result = await decrypt(token)
		if (result.security) {
			return {
				isAuthenticated: true,
				user: result.payload._id,
			}
		}
	}
	return {
		isAuthenticated: false,
	}
}

export async function logout() {
	return {
		isAuthenticated: false,
	}
}

export async function login(username: string, password: string) {
	const users = await getColl("users")

	const user = await users.findOne({username})

	if (!user)
		return {
			isAuthenticated: false,
			error: "USERNAME_OR_PASSWORD_INCORRECT",
		}

	if (!bcrypt.compareSync(password, user.password))
		return {
			isAuthenticated: false,
			error: "USERNAME_OR_PASSWORD_INCORRECT",
		}

	cookies().set(
		"token",
		crypt({
			_id: user._id,
			createAt: new Date().valueOf(),
			maxAge: 1000 * 60 * 60 * 24 * 30,
		}),
		{
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 1000 * 60 * 60 * 24 * 30,
		},
	)

	return {
		isAuthenticated: true,
	}
}

export async function register() {
	// bcrypt.hashSync(password, 10)
	return {
		isAuthenticated: true,
	}
}
