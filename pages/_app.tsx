import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Header from '@components/Header';
import { ListContext } from 'context/listContext';
import { useState } from 'react';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import { fetcher } from '@config/fetcher';

function MyApp({ Component, pageProps }: AppProps) {
  const [list, setList] = useState<Competition.List[]>([])
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: fetcher
      }}
    >
      <ListContext.Provider value={{ list, setList }}>
        <Head>
          <title>CODER</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </ListContext.Provider>
    </SWRConfig>
  )
}

export default MyApp
