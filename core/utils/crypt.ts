import crypto from "crypto"

const load = btoa(JSON.stringify({token: "JWT", type: "sha256"}))

export default function crypt(payload = {}) {
	let hash = crypto
		.createHash("sha256")
		.update(load + "." + btoa(JSON.stringify(payload)) + "." + btoa(process.env.JWT_SECRET_KEY as string))
		.digest("base64")
	return `${load}.${btoa(JSON.stringify(payload))}.${hash}`
}
