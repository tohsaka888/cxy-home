import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ButtonArea, Container, Flex, Logo } from './index.styled'
import { Button, Menu } from 'antd'
import { BsGithub, BsXCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs'
import { MenuItems } from './MenuItems'
import { useRouter } from 'next/router'
import { LoginContext } from 'context/loginContext'
import LoginPanel from '@components/LoginPanel'
import { ListContext } from 'context/listContext'
import { competitionUrl } from '@config/baseUrl'

function Header() {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
  const router = useRouter()
  const [visible, setVisible] = useState<boolean>(false)
  const { list } = useContext(ListContext)!
  const isHomePage = useMemo(() => {
    return !router.pathname.includes('competition')
  }, [router])

  const { setList } = useContext(ListContext)!

  const getList = useCallback(async () => {
    const res = await fetch(`${competitionUrl}/api/brief`, {
      mode: 'cors'
    })
    const data = await res.json()
    setList(data.list)
  }, [setList])

  useEffect(() => {
    getList()
  }, [getList, setList])
  return (
    <LoginContext.Provider value={{ visible, setVisible }}>
      <Container isHomePage={isHomePage}>
        <Flex>
          <Logo onClick={() => router.back()}>CODER</Logo>
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
              router.push(prop.key + '/' + list[0].id)
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
          <Button type="primary" shape='round' onClick={() => { setVisible(true) }}>登录</Button>
        </ButtonArea>
      </Container >
      <LoginPanel />
    </LoginContext.Provider>
  )
}

export default Header