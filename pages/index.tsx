/*
 * @Author: tohsaka888
 * @Date: 2022-09-02 14:10:53
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-02 17:12:03
 * @Description: 请填写简介
 */
import Header from '@components/Header'
import HomePage from '@components/HomePage'
import { competitionUrl } from '@config/baseUrl'
import type { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { SWRConfig } from 'swr'
import createFetch from '@vercel/fetch'

const StarBackground = dynamic(() => import('@components/StarBackground'), { ssr: false })

const Home: NextPage<{ fallback: any }> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <main>
        <Header />
        <StarBackground />
        <HomePage />
      </main>
    </SWRConfig>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const myfetch = createFetch()
  let data = null
  try {
    const res = await myfetch(`${competitionUrl}/api/brief`, {
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
