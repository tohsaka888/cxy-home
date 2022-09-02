/*
 * @Author: tohsaka888
 * @Date: 2022-09-02 14:10:53
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-02 17:04:20
 * @Description: 请填写简介
 */
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ButtonArea, Container, Flex, Logo, Username } from './index.styled'
import { Button, Menu, message } from 'antd'
import { BsGithub, BsXCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs'
import { MenuItems } from './MenuItems'
import { useRouter } from 'next/router'
import { LoginContext } from 'context/loginContext'
import LoginPanel from '@components/LoginPanel'
import { competitionUrl } from '@config/baseUrl'
import useSWR from 'swr'
import { fetcher } from '@config/fetcher'
import useLoginStatus from 'hooks/useLoginStatus'

function Header() {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
  const router = useRouter()
  const [visible, setVisible] = useState<boolean>(false)
  // const { list } = useContext(ListContext)!
  // console.log(router.pathname.split('/'))
  const isHomePage = useMemo(() => {
    return !router.pathname.includes('competition') && !router.pathname.includes('activity')
  }, [router])

  // const { setList } = useContext(ListContext)!
  const username = useLoginStatus()

  const { data, error } = useSWR(`${competitionUrl}/api/brief`, fetcher)

  return (
    <LoginContext.Provider value={{ visible, setVisible }}>
      <Container isHomePage={isHomePage}>
        <Flex>
          <Logo onClick={() => router.push('/')}>CODER</Logo>
          <Menu
            items={MenuItems}
            mode={'horizontal'}
            defaultSelectedKeys={[router.pathname.split('/')[1]]}
            style={{
              border: 'none',
              marginLeft: '16px',
              width: '500px',
              background: 'transparent',
              color: '#fff'
            }}
            onClick={(prop) => {
              if (prop.key === 'competition') {
                router.push('/' + prop.key + '/' + (data.list && data.list[0].id))
              } else {
                router.push('/' + prop.key)
              }
            }}
          />
        </Flex>


        <ButtonArea>
          {!isFullScreen
            ? <BsFillArrowUpCircleFill size={28} style={{ marginRight: '16px', color: '#fff' }}
              onClick={() => {
                setIsFullScreen(!isFullScreen)
                if (!isFullScreen) {
                  document.documentElement.requestFullscreen()
                } else {
                  document.exitFullscreen()
                }
              }} />
            : <BsXCircleFill size={28} style={{ marginRight: '16px', color: '#fff' }}
              onClick={() => {
                setIsFullScreen(!isFullScreen)
                if (!isFullScreen) {
                  document.documentElement.requestFullscreen()
                } else {
                  document.exitFullscreen()
                }
              }} />}
          <BsGithub size={28} style={{ marginRight: '16px', color: '#fff' }} />
          {username
            ? <Button type="primary" shape='round' onClick={() => { localStorage.removeItem('token') }} danger>退出登录</Button>
            : <Button type="primary" shape='round' onClick={() => { setVisible(true) }}>登录</Button>}
        </ButtonArea>
      </Container >
      <LoginPanel />
    </LoginContext.Provider>
  )
}

export default Header