import React from 'react'
import { ButtonArea, Container, Logo } from './index.styled'
import { Button } from 'antd'

function Header() {
  return (
    <Container>
      <Logo>CODER</Logo>
      <ButtonArea>
        <Button type="primary">登录</Button>
      </ButtonArea>
    </Container>
  )
}

export default Header