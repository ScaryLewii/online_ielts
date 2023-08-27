import Banner from '@/components/home/banner'
import ContactSection from '@/components/home/contact'
import HeaderSection from '@/components/home/header'
import LecturersSection from '@/components/home/lecturers'
import MethodSection from '@/components/home/methods'
import MissionSection from '@/components/home/mission'
import Head from 'next/head'
import { useValidToken } from '@/base/query'
import { useEffect } from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import { useRouter } from 'next/router'

export default function Home() {
	const router = useRouter()
	const token = router.query.token as string
	const saveToken = useValidToken().data as string

	useEffect(() => {
		const handleSesson = () => {
			if (typeof window == undefined) {
				return
			}
	
			if (token && token.length) {
				typeof window !== undefined && localStorage.setItem("token", token)
				return
			}
	
			if (!token && !saveToken) {
				// console.log("please login again")
				window.location.assign('https://ant-edu.ai/auth/login')
				return
			}
		}

		handleSesson()
	}, [saveToken, token])

	return (
		<>
		<Head>
			<title>IELTS Video Course</title>
			<meta name="description" content="Slice with nextjs by ThinhNguyen" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<main className='bg-sea relative'>
			<HeaderSection />
			<Banner />
			<MissionSection />
			<MethodSection />
			<LecturersSection />
			<ContactSection />
		</main>
		</>
	)
}