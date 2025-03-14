"use client"

import React, {useEffect, useState} from "react"
import {Tabs, TabsProps} from "antd"
import {useRouter, usePathname} from "next/navigation"

interface TabWithNavigationProps extends TabsProps {
	basePath: string
	onChange?: (key: string) => void
}

const TabWithNavigation = ({basePath, onChange, ...props}: TabWithNavigationProps) => {
	const [activeKey, setActiveKey] = useState<string | undefined>(undefined)
	const router = useRouter()
	const pathname = usePathname()

	useEffect(() => {
		let tabKey = pathname?.replace(`${basePath}/`, "")
		if (pathname === "/") {
			tabKey = "/"
		}

		if (tabKey) {
			setActiveKey(tabKey)
			onChange?.(tabKey)
		}
	}, [pathname, basePath, onChange])

	const handleTabChange = (key: string) => {
		router.push(`${basePath}/${key}`)
		setActiveKey(key)
		onChange?.(key)
	}

	return <Tabs onChange={handleTabChange} activeKey={activeKey} {...props} style={{minWidth: "100%"}} size='large' />
}

export default TabWithNavigation
