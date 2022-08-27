import React, { useState } from 'react'
import { ButtonArea, Container, Flex, Logo } from './index.styled'
import { Button, Menu } from 'antd'
import { BsGithub, BsArrowsFullscreen, BsFullscreenExit } from 'react-icons/bs'
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
        <Button
          style={{ marginRight: '16px', background: 'linear-gradient(30deg, #c850c0, #ffcc70)' }}
          icon={isFullScreen
            ? <BsFullscreenExit size={16} style={{ marginTop: '5px', color: '#fff' }} />
            : <BsArrowsFullscreen size={16} style={{ marginTop: '5px', marginLeft: '0.5px', color: '#fff' }} />}
          shape={'circle'}
          onClick={() => {
            setIsFullScreen(!isFullScreen)
            if (!isFullScreen) {
              document.documentElement.requestFullscreen()
            } else {
              document.exitFullscreen()
            }
          }}
        />
        <Button
          style={{ marginRight: '16px', background: 'linear-gradient(30deg, #c850c0, #ffcc70)' }}
          icon={<BsGithub size={20} style={{ marginTop: '3px', marginLeft: '0.5px', color: '#fff' }} />} shape={'circle'}
        />
        <Button type="primary" shape='round'>登录</Button>
      </ButtonArea>
    </Container >
  )
}

export default Header