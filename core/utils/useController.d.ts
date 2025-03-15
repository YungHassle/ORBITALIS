import React from "react"

type State = [any, React.Dispatch<any>]

export declare interface IFormController {
	value: any
	change: (data: any) => void
}

export default function useController(value: any, change?: (arg: any) => void, defaultValue?: any, controller?: IFormController, disable?: boolean): State
