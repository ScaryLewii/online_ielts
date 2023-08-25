import Banner from '@/components/home/banner'
import ContactSection from '@/components/home/contact'
import HeaderSection from '@/components/home/header'
import LecturersSection from '@/components/home/lecturers'
import MethodSection from '@/components/home/methods'
import MissionSection from '@/components/home/mission'
import Head from 'next/head'
import { useValidToken } from '@/base/query'
import { useEffect } from 'react'

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
			console.log("please login again")
			// window.location.assign('https://ant-edu.ai/auth/login')
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
	let token = req.query.token || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Imh1bmdkY0BnaDJ2cy5jb20iLCJlbWFpbCI6Imh1bmdkY0BnaDJ2cy5jb20iLCJqdGkiOiI1MGZiYTYzNC1hMTU5LTQ4YjYtODI4Zi0zZDBjYzExMDYzNGEiLCJyb2xlIjoiQURNSU4iLCJwdXIiOiJTaWduSW4iLCJuYmYiOjE2OTI2MjEzMTQsImV4cCI6MTY5MjY2NDUxNCwiaWF0IjoxNjkyNjIxMzE0LCJpc3MiOiJodHRwczovLzl0YWxrLmVkdS52biIsImF1ZCI6Imh0dHBzOi8vOXRhbGsuZWR1LnZuIn0.6vY_cn9xkQ-b2to7VAZD_Z91V-rbX-Us_dFpDoH4FSg"

	return { props: {token} }
}