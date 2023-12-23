import { fetchData } from '@/base/base'
import Gtag from '@/components/common/gtag'
import Banner from '@/components/home/banner'
import ContactSection from '@/components/home/contact'
import HeaderSection from '@/components/home/header'
import LecturersSection from '@/components/home/lecturers'
import MethodSection from '@/components/home/methods'
import MissionSection from '@/components/home/mission'
import Head from 'next/head'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'

export default function Home() {
	const [cookies] = useCookies(['.AspNetCore.SharedCookie']);
	useEffect(() => {
		const testData = fetchData("user/info", "GET", cookies)
	})

	return (
		<>
		<Head>
			<title>IELTS Video Course</title>
			<meta name="description" content="Slice with nextjs by ThinhNguyen" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<Gtag />
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