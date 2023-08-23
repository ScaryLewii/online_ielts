import Banner from '@/components/home/banner'
import ContactSection from '@/components/home/contact'
import HeaderSection from '@/components/home/header'
import LecturersSection from '@/components/home/lecturers'
import MethodSection from '@/components/home/methods'
import MissionSection from '@/components/home/mission'
import Head from 'next/head'
import { serialize } from 'cookie'
import { ParsedUrlQuery } from 'querystring'
import { NextApiRequest, NextApiResponse } from 'next'
import { useUserQuery, useValidToken } from '@/base/query'
import { useEffect } from 'react'

export default function Home() {
	const token = useValidToken().data as string

	useEffect(() => {
		if (typeof window == undefined) {
			return
		}

		const params = new URLSearchParams(window.location.pathname)
		const tokenParm = params.get("token")

		if (!token && !tokenParm) {
			console.log("please login again")
			return
		}

		if (tokenParm && tokenParm.length) {
			typeof window !== undefined && localStorage.setItem("token", tokenParm)
		}
	}, [token])

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