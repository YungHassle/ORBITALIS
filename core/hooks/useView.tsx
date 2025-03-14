import {createContext, useContext} from "react"

const context = createContext(false)

export const ViewProvider = ({children, isMobileView}) => {
	const Provider = context.Provider
	return <Provider value={isMobileView}>{children}</Provider>
}

export const useView = () => {
	return useContext(context)
}
