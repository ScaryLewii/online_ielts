import Layout from '@/components/common/layout'
import '@/styles/globals.css'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app'

const queryClient = new QueryClient();

export default function App({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  )
}
