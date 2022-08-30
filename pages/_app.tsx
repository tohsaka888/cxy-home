import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Header from '@components/Header';
import { ListContext } from 'context/listContext';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [list, setList] = useState<Competition.List[]>([])
  return (
    <ListContext.Provider value={{ list, setList }}>
      <Header />
      <Component {...pageProps} />
    </ListContext.Provider>
  )
}

export default MyApp
