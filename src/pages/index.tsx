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
	let token = req.query.token || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Imh1bmdkY0BnaDJ2cy5jb20iLCJlbWFpbCI6Imh1bmdkY0BnaDJ2cy5jb20iLCJqdGkiOiI3MDU5YTkwMi02MTU1LTRhYjktODQ2NS01NTgxNWY5OTJkODQiLCJyb2xlIjoiQURNSU4iLCJwdXIiOiJTaWduSW4iLCJuYmYiOjE2OTIxNTE0OTksImV4cCI6MTY5MjE5NDY5OSwiaWF0IjoxNjkyMTUxNDk5LCJpc3MiOiJodHRwczovLzl0YWxrLmVkdS52biIsImF1ZCI6Imh0dHBzOi8vOXRhbGsuZWR1LnZuIn0.520s2oS4QEjio9f17rLgW58YW4yKZzs2KVjmU8w1bZo"

	return { props: {token} }
}