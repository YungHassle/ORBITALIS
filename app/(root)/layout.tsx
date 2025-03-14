import ClientLayout from "./layout.client"

export default async function Layout({children}: {children: React.ReactNode}) {
	return <ClientLayout>{children}</ClientLayout>
}
