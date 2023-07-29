import Layout from '@/components/common/layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  return (
    <SessionProvider session={session} basePath="/api/auth">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
