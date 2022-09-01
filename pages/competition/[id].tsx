import { competitionUrl } from '@config/baseUrl'
import { BackTop, Layout, Menu, Spin } from 'antd'
import { useRouter } from 'next/router'
import useSWR, { SWRConfig } from 'swr'
import React, { useMemo } from 'react'
import Detail from '@components/Competition'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${competitionUrl}/api/brief`)
  const data = await res.json()
  const list = data.list as Competition.List[]
  const listIds = list.map(item => ({ params: { id: item.id } }))

  return {
    paths: listIds,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const res = await fetch(`${competitionUrl}/api/competition/${ctx.params?.id}`)
  const data = await res.json()

  return {
    props: {
      fallback: {
        [competitionUrl + '/api/competition/' + ctx.params?.id]: data
      }
    }
  }
}

const Competiton: NextPage<{ fallback: any }> = ({ fallback }) => {

  return (
    <SWRConfig value={{ fallback }}>
      <Content />
    </SWRConfig>
  )
}

export const Content = () => {
  const { Sider, Content } = Layout
  const router = useRouter()
  const { data } = useSWR(`${competitionUrl}/api/brief`)
  const { data: { competition } } = useSWR(`${competitionUrl}/api/competition/${router.query.id}`)
  const menuItems = useMemo(() => {
    return data ? (data.list as Competition.List[]).map(item => ({
      label: item.name,
      key: item.id
    })) : []
  }, [data])

  return (
    <Layout style={{ paddingTop: '60px', height: '100vh', overflow: 'auto' }}>
      <Sider theme='light' style={{ position: 'fixed', height: '100vh' }}>
        {menuItems.length > 0 && <>
          <Menu items={menuItems || []} defaultSelectedKeys={[router.query.id as string]}
            onClick={(props) => {
              router.push(`/competition/${props.key}`)
            }}
          />
        </>}
        {menuItems.length === 0 && <>
          {new Array(10).fill('').map((item, index) => {
            return (
              <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '48px' }}>
                <Spin />
              </div>
            )
          })}
        </>}
      </Sider>
      <Content style={{ padding: '16px', marginLeft: '200px' }}>
        <Detail competition={competition} />
      </Content>
      <BackTop />
    </Layout>
  )
}

export default Competiton