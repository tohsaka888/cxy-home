import { competitionUrl } from '@config/baseUrl'
import { Layout } from 'antd'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

function Competiton() {
  const { Sider, Content } = Layout
  return (
    <Layout style={{ paddingTop: '60px', height: '100vh' }}>
      <Sider theme='light'>

      </Sider>
      <Content>
        11111
      </Content>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${competitionUrl}/api/brief`)
  const data = await res.json()
  console.log(data)
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
  console.log(data)

  return {
    props: {}
  }
}

export default Competiton