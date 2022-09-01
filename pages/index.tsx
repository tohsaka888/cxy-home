import HomePage from '@components/HomePage'
import { competitionUrl } from '@config/baseUrl'
import { ListContext } from 'context/listContext'
import createFetch from '@vercel/fetch'
import type { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import Fetch from 'node-fetch'

const StarBackground = dynamic(() => import('@components/StarBackground'), { ssr: false })

const Home: NextPage<{ list: Competition.List[] }> = ({ list }) => {
  return (
    <div>
      <main>
        <StarBackground />
        <HomePage />
      </main>
    </div>
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
    console.log(data)
  } catch (error) {
    console.log(error)
  }
  return {
    props: {
      list: data ? data.list : []
    }
  }
}

export default Home
