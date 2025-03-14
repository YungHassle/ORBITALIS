import Cookies from "cookies"
import {createWithMiidleware} from "next-request-handler"

import middleware from "./middleware"

export const RequestHandler = createWithMiidleware(Cookies.express([process.env.COOKIE_KEY]), middleware())
