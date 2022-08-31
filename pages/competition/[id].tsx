import { competitionUrl } from '@config/baseUrl'
import { BackTop, Layout, Menu, Skeleton, Spin } from 'antd'
// import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import useSWR, { useSWRConfig } from 'swr'
import React, { useContext, useMemo } from 'react'
import { fetcher } from '@config/fetcher'
import { ListContext } from 'context/listContext'
import Detail from '@components/Competition'

function Competiton() {
  const { Sider, Content } = Layout
  const router = useRouter()
  const { cache } = useSWRConfig()
  const shouldFetch = cache.get(`${competitionUrl}/api/brief`)
  const result = useSWR(`${competitionUrl}/api/brief`, !shouldFetch ? fetcher : null)

  const list: Competition.List[] = useMemo(() => {
    if (shouldFetch) {
      return shouldFetch.list
    }

    if (result.data) {
      return result.data.list
    } else {
      return []
    }
  }, [result.data, shouldFetch])


  const { data } = useSWR(`${competitionUrl}/api/competition/${router.query.id}`, fetcher)

  const competition = useMemo(() => {
    if (data && data.success) {
      return data.competition
    } else {
      return null
    }
  }, [data])

  const menuItems = useMemo(() => {
    return list ? list.map((item) => ({
      label: item.name,
      key: item.id
    })) : []
  }, [list])

  return (
    <Layout style={{ paddingTop: '60px', height: '100vh', overflow: 'auto' }}>
      <Sider theme='light' style={{ position: 'fixed', height: '100vh' }}>
        {menuItems.length > 0 && <>
          <Menu items={menuItems} defaultSelectedKeys={[router.query.id as string]}
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

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch(`${competitionUrl}/api/brief`)
//   const data = await res.json()
//   console.log(data)
//   const list = data.list as Competition.List[]
//   const listIds = list.map(item => ({ params: { id: item.id } }))

//   return {
//     paths: listIds,
//     fallback: false
//   }
// }

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const res = await fetch(`${competitionUrl}/api/competition/${ctx.params?.id}`)
//   const data = await res.json()
//   console.log(data)

//   return {
//     props: {}
//   }
// }

export default Competiton