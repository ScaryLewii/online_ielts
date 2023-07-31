import Banner from '@/components/home/banner'
import ContactSection from '@/components/home/contact'
import HeaderSection from '@/components/home/header'
import LecturersSection from '@/components/home/lecturers'
import MethodSection from '@/components/home/methods'
import MissionSection from '@/components/home/mission'
import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  useState(() => {
    
  })
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
