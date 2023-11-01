import { useUserQuery, useValidToken } from '@/base/query'
import Gtag from '@/components/common/gtag'
import Banner from '@/components/home/banner'
import ContactSection from '@/components/home/contact'
import HeaderSection from '@/components/home/header'
import LecturersSection from '@/components/home/lecturers'
import MethodSection from '@/components/home/methods'
import MissionSection from '@/components/home/mission'
import { tokenAPI } from '@/context/context'
import { NextApiRequest, NextApiResponse } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'

interface IToken {
	token: string
}


export default function Home({token}: IToken) {
	const { isFetched: isFinishFetchToken, data: saveToken} = useValidToken()
	const { isFetched: isFinishSignup, data: newUser } = useUserQuery(token)
	const { isFetched: isFinishFetchOldUser, data: oldUser  } = useUserQuery(saveToken)

	useEffect(() => {
		if (token && typeof window !== undefined) {
			localStorage.setItem("token", token)
		}
	
		if (isFinishSignup && !newUser && isFinishFetchOldUser && !oldUser) {
			// window.location.assign('https://ant-edu.ai/auth/login')
			console.log('pls login again')
			return
		}
	}, [isFinishFetchOldUser, isFinishSignup, newUser, oldUser, token])

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

export const getServerSideProps = async (req: NextApiRequest, res: NextApiResponse) => {
	let token = req.query.token || ""

	return { props: {token} }
}