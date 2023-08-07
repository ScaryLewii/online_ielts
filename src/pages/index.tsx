import Banner from '@/components/home/banner'
import ContactSection from '@/components/home/contact'
import HeaderSection from '@/components/home/header'
import LecturersSection from '@/components/home/lecturers'
import MethodSection from '@/components/home/methods'
import MissionSection from '@/components/home/mission'
import Head from 'next/head'
import type { GetServerSideProps } from 'next'
import { serialize } from 'cookie'
import { IContext } from '@/components/types/types'

export default function Home() {
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

export const getServerSideProps: GetServerSideProps<{data: IContext}> = async (context) => {
  const urlQueryParams = context.query
  const token = urlQueryParams.token as string
  const cookie = serialize('token', token, {
		httpOnly: true
	})
  context.res.setHeader("set-Cookie", cookie)

  return { props: {} }
}