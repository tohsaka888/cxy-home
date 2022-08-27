import React, { useState } from 'react'
import { ButtonArea, Container, Flex, Logo } from './index.styled'
import { Button, Menu } from 'antd'
import { BsGithub, BsXCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs'
import { MenuItems } from './MenuItems'
import { useRouter } from 'next/router'

function Header() {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
  const router = useRouter()
  return (
    <Container>
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
            router.push(prop.key)
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
        <Button type="primary" shape='round'>登录</Button>
      </ButtonArea>
    </Container >
  )
}

export default Header