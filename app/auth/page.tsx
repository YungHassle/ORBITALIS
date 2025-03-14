"use server"

import ClientPage from "./page.client"

export default async function Page({searchParams}) {
	return <ClientPage searchParams={searchParams} />
}
