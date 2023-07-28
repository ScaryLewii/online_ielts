import Layout from '@/components/common/layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider, useSession } from "next-auth/react"

export default function App({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
