import "_styles/globals.css"
import "_styles/font.css"
import {THEME_ANTD} from "_constants/theme.antd"
import {ConfigProvider} from "antd"
import {AntdRegistry} from "@ant-design/nextjs-registry"
import localeRu from "antd/locale/ru_RU"

export const metadata = {
	title: "O R B I T A L I S",
	description: "Информационная система службы персонала корпорации",
	applicationName: "ORBITALIS",
	twitter: {
		description: "Информационная система службы персонала корпорации",
	},
	robots: "all",
	authors: {name: "ORBITALIS"},
	icons: [
		{rel: "icon", sizes: "32x32", url: "/favicon-32x32.png"},
		{rel: "icon", sizes: "16x16", url: "/favicon-16x16.png"},
	],
	manifest: "/site.webmanifest",
	other: {
		"msapplication-TileColor": "#1677fd",
	},
}

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang='ru'>
			<body>
				<AntdRegistry layer>
					<ConfigProvider theme={THEME_ANTD} locale={localeRu}>
						{children}
					</ConfigProvider>
				</AntdRegistry>
			</body>
		</html>
	)
}
