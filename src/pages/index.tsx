import Banner from '@/components/home/banner'
import ContactSection from '@/components/home/contact'
import HeaderSection from '@/components/home/header'
import LecturersSection from '@/components/home/lecturers'
import MethodSection from '@/components/home/methods'
import MissionSection from '@/components/home/mission'
import Head from 'next/head'
import { useValidToken } from '@/base/query'
import { useEffect } from 'react'
import { NextApiRequest } from 'next'

interface IToken {
	token: string
}

export default function Home({token}: IToken) {
	const saveToken = useValidToken().data as string

	useEffect(() => {
		if (typeof window == undefined) {
			return
		}

		if (!token && !saveToken) {
			// console.log("please login again")
			window.location.assign('https://ant-edu.ai/auth/login')
			return
		}

		if (token && token.length) {
			typeof window !== undefined && localStorage.setItem("token", token)
		}
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

export const getServerSideProps = async (req: NextApiRequest, res: NextApiResponse) => {
	let token = req.query.token || ""

	return { props: {token} }
}