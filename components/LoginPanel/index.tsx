import { Flex } from '@components/Header/index.styled'
import { loginUrl } from '@config/baseUrl'
import { Form, Modal, Input, Button, Image, message } from 'antd'
import { LoginContext } from 'context/loginContext'
import useAuthCode from 'hooks/useAuthCode'
import React, { useCallback, useContext, useEffect, useReducer, useState } from 'react'

type ActionType =
  | { type: 'setUsername', payload: string }
  | { type: 'setPassword', payload: string }
  | { type: 'setAuthcode', payload: string }
  | { type: 'setEmailAuthcode', payload: string }
  | { type: 'setEmail', payload: string }

const initialState = {
  username: '',
  email: '',
  password: '',
  authcode: '',
  emailAuthcode: ''
}

function reducer(state: typeof initialState, action: ActionType) {
  switch (action.type) {
    case 'setUsername':
      return { ...state, username: action.payload }
    case 'setPassword':
      return { ...state, password: action.payload }
    case 'setAuthcode':
      return { ...state, authcode: action.payload }
    case 'setEmail':
      return { ...state, email: action.payload }
    case 'setEmailAuthcode':
      return { ...state, emailAuthcode: action.payload }
  }
}

function LoginPanel() {
  const { visible, setVisible } = useContext(LoginContext)!
  const [current, setCurrent] = useState<'用户名登录' | '注册' | '找回密码' | '邮箱登录'>('用户名登录')
  const { veriftAuthcode, authcode, createAuthcode } = useAuthCode()
  const [account, dispath] = useReducer(reducer, initialState)
  const [loading, setLoading] = useState<boolean>(false)
  const [form] = Form.useForm()

  const login = useCallback(async () => {
    setLoading(true)
    try {
      await form.validateFields()

      if (veriftAuthcode(account.authcode)) {
        const way = current === '用户名登录' ? 'username' : 'email'
        const res = await fetch(`${loginUrl}/api/login/${way}`, {
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify({
            [way]: account[way],
            password: account.password
          })
        })
        const data = await res.json()
        if (data.success) {
          if (data.canLogin) {
            message.success('登录成功')
            setVisible(false)
          } else {
            createAuthcode()
            message.error('非法登入')
          }
        } else {
          message.error(data.error)
        }
      } else {
        message.error('验证码错误')
        createAuthcode()
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }, [account, createAuthcode, current, form, setVisible, veriftAuthcode])

  return (
    <Modal
      width={450}
      style={{ marginTop: '80px' }}
      visible={visible}
      onOk={() => {

      }}
      title={current}
      footer={<Button type="link">没有账号,现在注册</Button>}
      onCancel={() => { setVisible(false) }}
    >
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 17 }} form={form}>
        {(current === '用户名登录' || current === '邮箱登录') && <>
          <Form.Item
            name={current === '邮箱登录' ? 'email' : 'username'}
            label={current === '邮箱登录' ? '邮箱' : '用户名'}
            style={{ marginBottom: '16px', fontSize: '18px' }}
            rules={[
              {
                required: true,
                message: `请输入${current === '邮箱登录' ? '邮箱' : '用户名'}`,
              },
            ]}
          >
            <Input placeholder={current === '邮箱登录' ? '邮箱' : '用户名'} style={{ height: '38px' }}
              onChange={(e) => {
                dispath({ type: current === '邮箱登录' ? 'setEmail' : 'setUsername', payload: e.target.value })
              }}
            />
          </Form.Item>
          <Form.Item name={"password"} label="密码" style={{ marginBottom: '16px' }}
            rules={[
              {
                required: true,
                message: `请输入密码`,
              },
            ]}
          >
            <Input placeholder={"请输入密码"} style={{ height: '38px' }}
              onChange={(e) => {
                dispath({ type: 'setPassword', payload: e.target.value })
              }}
            />
          </Form.Item>
          <Form.Item name={"authcode"} label="验证码" style={{ marginBottom: '8px' }}
            validateStatus={account.authcode ? (veriftAuthcode(account.authcode) ? 'success' : 'error') : ''}
            hasFeedback
            rules={[
              {
                required: true,
                message: `请输入验证码`,
              },
            ]}
          >
            <Flex>
              <Input placeholder={"请输入验证码"} style={{ height: '38px' }}
                onChange={(e) => {
                  dispath({ type: 'setAuthcode', payload: e.target.value })
                }}
              />
              <div
                style={{ border: '1px solid #cecece', cursor: 'pointer', maxHeight: '38px' }}
                dangerouslySetInnerHTML={{ __html: authcode.data }}
                onClick={() => {
                  createAuthcode()
                }}
              />
            </Flex>
          </Form.Item>
          <Flex style={{ alignItems: 'center', justifyContent: 'space-between', padding: '0px 24px' }}>
            <Button type="link" onClick={() => setCurrent(current === '用户名登录' ? '邮箱登录' : '用户名登录')}>{current === '用户名登录' ? '邮箱登录' : '用户名登录'}</Button>
            <Button type='link'>忘记密码</Button>
          </Flex>
          <Flex style={{ alignItems: 'center', justifyContent: 'center', marginTop: '8px' }}>
            <Button style={{ width: '80%', height: '38px' }} type="primary" htmlType="submit" onClick={login} loading={loading}>登录</Button>
          </Flex>
        </>}
      </Form>
    </Modal>
  )
}

export default LoginPanel