import HomePage from '@components/HomePage'
import { competitionUrl } from '@config/baseUrl'
import { fetcher } from '@config/fetcher'
import type { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { SWRConfig } from 'swr'

const StarBackground = dynamic(() => import('@components/StarBackground'), { ssr: false })

const Home: NextPage<{ fallback: any }> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <main>
        <StarBackground />
        <HomePage />
      </main>
    </SWRConfig>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // const myfetch = createFetch(undefined, {
  //   timeout: 60000,
  //   keepAliveMsecs: 6000,
  //   maxSockets: 50000
  // })
  let data = null
  try {
    const res = await fetch(`${competitionUrl}/api/brief`, {
      headers: {
        'Content-Type': ' application/json'
      }
    })
    data = await res.json()
  } catch (error) {
    console.log(error)
  }
  return {
    props: {
      fallback: {
        [competitionUrl + '/api/brief']: data,
      }
    }
  }
}

export default Home
