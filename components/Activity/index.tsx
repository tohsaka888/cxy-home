/*
 * @Author: tohsaka888
 * @Date: 2022-09-02 14:21:15
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-02 16:31:43
 * @Description: 请填写简介
 */

import Header from '@components/Header'
import { Flex } from '@components/Header/index.styled'
import { activityUrl } from '@config/baseUrl'
import { Spin } from 'antd'
import React, { useCallback, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Card from './Card'
import { Container, Target } from './index.styled'
// import useSWR from 'swr'

type Props = {
  list: Activity.Activity[]
}

function Detail({ list }: Props) {
  const [params, setParams] = useState<{ page: number, limit: number }>({ page: 2, limit: 10 })
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [activities, setActivities] = useState<Activity.Activity[]>(list)
  const fetcher = useCallback(async (url: string) => {
    const res = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...params })
    })
    const data = await res.json()
    if (data.success) {
      setParams({ ...params, page: params.page + 1 })
      setActivities([...activities, ...data.list])
      setHasMore(data.list.length !== 0)
    }
  }, [activities, params])
  return (
    <>
      <Header />
      <Container>
        <Target id={'target'}>
          <InfiniteScroll
            dataLength={activities.length}
            next={() => fetcher(`${activityUrl}/api/list`)}
            scrollableTarget={'target'}
            endMessage={
              <p style={{ textAlign: 'center', marginBottom: '16px' }}>
                <b>~~到底啦~~</b>
              </p>
            }
            hasMore={hasMore}
            loader={<Spin />}>
            {activities.map(activity => <Card activity={activity} key={activity._id} />)}
          </InfiniteScroll>
        </Target>
      </Container>
    </>
  )
}

export default Detail