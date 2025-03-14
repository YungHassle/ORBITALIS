import {uniqueId} from "lodash"

const nodes = {}

const colors = {
	error: "#f205",
	warn: "#aa03",
	success: "#0a03",
	info: "var(--rui_color00)",
}

function getBase(className, node) {
	const b = document.querySelector("." + className)
	if (b) return b
	else {
		const div = document.createElement("div")
		div.className = className
		node.appendChild(div)
		return div
	}
}

function createMessage(type, msg, options) {
	if (!document) return
	const body = getBase("_msg_holder_af23fsad", document.body)
	const id = options?.id || uniqueId()
	if (nodes[id]) {
		clearTimeout(nodes[id].timer)
		nodes[id].killFn()
		delete nodes[id]
	}
	const node = document.createElement("div")
	const close = document.createElement("div")
	node.className = "_msg_SCrhytj"
	close.className = "_cls_WG4365t"
	node.style.boxShadow = `inset 0 0 1em .1em ${colors[type]}`
	node.innerHTML = msg
	node.appendChild(close)
	const killFn = () => {
		try {
			body.removeChild(node)
		} catch (error) {}
	}
	close.onclick = killFn
	nodes[id] = {
		node,
		killFn,
		timer: setTimeout(killFn, (options?.time || msg.length / 5) * 1000),
	}
	body.appendChild(node)
	return id
}

export const message = {
	error: (...args) => createMessage("error", ...args),
	warn: (...args) => createMessage("warn", ...args),
	success: (...args) => createMessage("success", ...args),
	info: (...args) => createMessage("info", ...args),
}
