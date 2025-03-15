import _ from "lodash"
import {useEffect, useState} from "react"
import {IFormController} from "./useController.d"

const STATUS = {
	IDLE: Symbol("idle"),
	CHANGE: Symbol("change"),
}

export default function useController(
	value: any,
	change?: (arg: any) => void,
	defaultValue?: any,
	controller?: IFormController,
	disable?: boolean,
): [any, React.Dispatch<any>] {
	const [data, setData] = useState({value: controller?.value ?? value ?? defaultValue, status: STATUS.IDLE})

	useEffect(() => {
		const v = controller?.value ?? value ?? defaultValue
		if (!_.isEqual(v, data.value)) {
			setData({value: _.cloneDeep(v), status: STATUS.IDLE})
		}
	}, [value, controller?.value])

	useEffect(() => {
		if (data.status === STATUS.IDLE) return
		if (disable) return

		setData((old) => ({value: old.value, status: STATUS.IDLE}))

		const c = controller?.change ?? change
		if (!_.isEqual(value, data.value)) {
			c && c(_.cloneDeep(data.value))
		}
	}, [data])

	return [
		data.value,
		(value) => {
			if (typeof value == "function") setData((old) => ({value: value(old.value), status: STATUS.CHANGE}))
			else setData({value, status: STATUS.CHANGE})
		},
	]
}
