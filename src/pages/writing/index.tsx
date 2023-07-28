'use client'

import Breadcrumbs from "@/components/common/breadcrumbs";
import VideoBlock from "./video";
import VocabularyBlock from "./vocabulary";
import { useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";


const WrittingPage = () => {
	const router = useRouter()
	useEffect(() => {
		const handleGetSession = async () => {
			const session = await getSession()
			if (!session) {
				router.push('/login')
			}   
		}
		
		handleGetSession()
	}, [])

	return <>
		<Breadcrumbs />
		<VideoBlock />
		<VocabularyBlock />
	</>
}

export default WrittingPage