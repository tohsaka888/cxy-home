import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import createFetch from '@vercel/fetch'
import { activityUrl } from '@config/baseUrl'
import useSWR, { SWRConfig } from 'swr'

const Activity: NextPage<{ fallback: any }> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>Activity</SWRConfig>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  let data = null
  try {
    const myfetch = createFetch(undefined)
    const res = await myfetch(`${activityUrl}/api/list`, {
      method: 'POST',
      body: JSON.stringify({ page: 1, limit: 10 })
    })
    data = await res.json()
  } catch (error) {
    console.log((error as Error).message)
  }

  return {
    props: {
      fallback: {
        [`${activityUrl}/api/list`]: data
      }
    }
  }
}

export default Activity