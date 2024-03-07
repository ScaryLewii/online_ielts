import Layout from '@/components/common/layout'
import '@/styles/globals.css'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';

const queryClient = new QueryClient();

export default function App({ Component, pageProps: { session, ...pageProps }}: AppProps) {
  const router = useRouter()

  if (router.pathname === "/") {
    return (
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps}/>
        </Hydrate>
      </QueryClientProvider>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout >
          <Component {...pageProps}/>
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  )
}
