import {RequestHandler} from "_utils/handler"

const handler = RequestHandler()

handler.get(async (req) => {
	return {...req.user, name: req.user?.name}
})

export default handler.handle
