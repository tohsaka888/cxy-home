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
  const isHomePage = useMemo(() => {
    return !router.pathname.includes('competition')
  }, [router])

  // const { setList } = useContext(ListContext)!
  const username = useLoginStatus()

  const { data, error } = useSWR(`${competitionUrl}/api/brief`, fetcher)


  const list = useMemo(() => data && data.list, [data])

  return (
    <LoginContext.Provider value={{ visible, setVisible }}>
      <Container isHomePage={isHomePage}>
        <Flex>
          <Logo onClick={() => router.push('/')}>CODER</Logo>
          <Menu
            items={MenuItems}
            mode={'horizontal'}
            style={{
              border: 'none',
              marginLeft: '16px',
              width: '500px',
              background: 'transparent',
              color: '#fff'
            }}
            onClick={(prop) => {
              router.push('/' + prop.key + '/' + (list && list[0].id))
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