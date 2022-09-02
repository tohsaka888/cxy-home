/*
 * @Author: tohsaka888
 * @Date: 2022-09-02 14:10:53
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-02 17:27:52
 * @Description: 请填写简介
 */
import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
// import createFetch from '@vercel/fetch'
import { activityUrl } from '@config/baseUrl'
import { SWRConfig } from 'swr'
import Detail from '@components/Activity'

const Activity: NextPage<{ fallback: any, list: Activity.Activity[] }> = ({ fallback, list }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Detail list={list} />
    </SWRConfig>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  let data: any = null
  try {
    // const myfetch = createFetch(undefined)
    const res = await fetch(`${activityUrl}/api/list`, {
      method: 'POST',
      body: JSON.stringify({ page: 1, limit: 10 }),
      headers: { 'Content-Type': 'application/json' },
    })
    data = await res.json()
  } catch (error) {
    console.log((error as Error).message)
  }

  return {
    props: {
      fallback: {
        [`${activityUrl}/api/list`]: data,
      },
      list: data ? data.list : []
    }
  }
}

export default Activity