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

interface IToken {
	token: string
}

export default function Home({token}: IToken) {
	typeof window !== "undefined" && token && localStorage.setItem("token", token)

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
	let token = req.query.token || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Imh1bmdkY0BnaDJ2cy5jb20iLCJlbWFpbCI6Imh1bmdkY0BnaDJ2cy5jb20iLCJuYW1laWQiOiIyNTUyMDIiLCJqdGkiOiJjMDQ5MGQzZC1lMTg0LTQ1MTEtYmZhYy03NWJhNGVkMTQ5ZjYiLCJyb2xlIjoiQURNSU4iLCJwdXIiOiJTaWduSW4iLCJuYmYiOjE2OTIwMjAzOTUsImV4cCI6MTY5MjA2MzU5NSwiaWF0IjoxNjkyMDIwMzk1LCJpc3MiOiJodHRwczovL2FkbWluLmFudC1lZHUuYWkiLCJhdWQiOiJodHRwczovL2FkbWluLmFudC1lZHUuYWkifQ.wmEsuOUBJjIXLOizJVDTqYbxgT0i7atklguR5kVdK40"

	return { props: {token} }
}