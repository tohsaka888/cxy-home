import { Flex } from '@components/Header/index.styled'
import { loginUrl } from '@config/baseUrl'
import { Form, Modal, Input, Button, message } from 'antd'
import { LoginContext } from 'context/loginContext'
import useAuthCode from 'hooks/useAuthCode'
import useTiming from 'hooks/useTiming'
import React, { useCallback, useContext, useReducer, useState } from 'react'

type ActionType =
  | { type: 'setUsername', payload: string }
  | { type: 'setPassword', payload: string }
  | { type: 'setAuthcode', payload: string }
  | { type: 'setEmailAuthcode', payload: string }
  | { type: 'setEmail', payload: string }
  | { type: 'setNewPassword', payload: string }

const initialState = {
  username: '',
  email: '',
  password: '',
  authcode: '',
  emailAuthcode: '',
  newPassword: ''
}

function reducer(state: typeof initialState, action: ActionType) {
  switch (action.type) {
    case 'setUsername':
      return { ...state, username: action.payload }
    case 'setPassword':
      return { ...state, password: action.payload }
    case 'setNewPassword':
      return { ...state, newPassword: action.payload }
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
  const [canVerify, setCanVerify] = useState<boolean>(false)
  const [canRegister, setCanRegister] = useState<boolean>(false)
  const [form] = Form.useForm()
  const { reset, timing } = useTiming(60 * 1000)

  const sendEmail = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`${loginUrl}/api/authcode/get`, {
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        email: account.email
      })
    })
    const data = await res.json()
    if (data.success) {
      message.success('发送成功,请查看邮箱')
      setCanVerify(true)
      reset()
    } else {
      message.error(data.error)
    }
    setLoading(false)
  }, [account.email, reset])

  const verifyEmail = useCallback(async () => {
    const res = await fetch(`${loginUrl}/api/authcode/verify`, {
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        email: account.email,
        code: account.emailAuthcode
      })
    })
    const data = await res.json()
    if (data.success) {
      if (data.canRegister) {
        setCanRegister(true)
        message.success('验证成功')
      } else {
        message.error('验证失败')
      }
    }
  }, [account.email, account.emailAuthcode])

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
            localStorage.setItem('token', data.token)
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

  const register = useCallback(async () => {
    setLoading(true)
    try {
      await form.validateFields()
      const res = await fetch(`${loginUrl}/api/register`, {
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          username: account.username,
          password: account.password,
          email: account.email
        })
      })
      const data = await res.json()
      if (data.success) {
        if (data.isRegister) {
          message.success('注册成功')
          setCurrent('用户名登录')
          setCanRegister(false)
        }
      } else {
        message.error(data.error)
      }
    } catch (e) {
      message.error((e as Error).message)
    }
    setLoading(false)
  }, [account.email, account.password, account.username])

  const forget = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`${loginUrl}/api/forget`, {
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        password: account.password,
        email: account.email
      })
    })
    const data = await res.json()
    if (data.success) {
      if (data.isReset) {
        message.success('修改成功')
        setCurrent('用户名登录')
        setCanRegister(false)
      } else {
        message.error('修改失败')
      }
    } else {
      message.error(data.error)
    }
    setLoading(false)
  }, [account.email, account.password])

  return (
    <Modal
      width={450}
      style={{ marginTop: '80px' }}
      visible={visible}
      title={current}
      footer={
        current === '注册'
          ? <Button type="link" onClick={() => setCurrent('用户名登录')}>已有账号,现在登录</Button>
          : <Button type="link" onClick={() => setCurrent('注册')}>没有账号,现在注册</Button>
      }
      onCancel={() => { setVisible(false) }}
    >
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} form={form}>
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
              type="password"
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
            <Button type='link' onClick={() => setCurrent('找回密码')}>忘记密码</Button>
          </Flex>
          <Flex style={{ alignItems: 'center', justifyContent: 'center', marginTop: '8px' }}>
            <Button style={{ width: '80%', height: '38px' }} type="primary" htmlType="submit" onClick={login} loading={loading}>登录</Button>
          </Flex>
        </>}

        {((current === '找回密码' || current === '注册') && !canRegister) && <>
          <Form.Item
            name={'email'}
            label={'邮箱'}
            style={{ marginBottom: '16px', fontSize: '18px' }}
            rules={[
              {
                required: true,
                message: `请输入${'邮箱'}`,
              },
            ]}
          >
            <Input placeholder={'请输入邮箱'} style={{ height: '38px' }}
              onChange={(e) => {
                dispath({ type: 'setEmail', payload: e.target.value })
              }}
            />
          </Form.Item>
          <Form.Item name={"authcode"} label="验证码" style={{ marginBottom: '16px' }}
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
          <Form.Item
            name={"emailAuthcode"}
            label="邮箱验证码"
            style={{ marginBottom: '24px' }}
            rules={[
              {
                required: true,
                message: `请输入验证码`,
              },
            ]}
          >
            <Flex style={{ alignItems: 'center' }}>
              <Input placeholder={"请输入验证码"} style={{ height: '38px' }}
                onChange={(e) => {
                  dispath({ type: 'setEmailAuthcode', payload: e.target.value })
                }}
              />
              <Button
                style={{ height: '37px' }}
                type="primary"
                loading={loading}
                disabled={!veriftAuthcode(account.authcode) ? true : (
                  canVerify ? (timing === 0 ? false : true) : false
                )}
                onClick={() => {
                  sendEmail()
                }}
              >{
                  timing !== 0 ? (
                    canVerify ? (timing / 1000).toFixed(0) + '秒后可重新获取' : '获取验证码'
                  ) : '获取验证码'
                }</Button>
            </Flex>
          </Form.Item>
          <Flex style={{ alignItems: 'center', justifyContent: 'center', marginTop: '8px' }}>
            <Button style={{ width: '80%', height: '38px' }} type="primary" htmlType="submit" onClick={verifyEmail} loading={loading}
              disabled={!canVerify}
            >验证</Button>
          </Flex>
        </>}

        {(canRegister && current === '注册') && <>
          <Form.Item
            name={'email'}
            label={'邮箱'}
            style={{ marginBottom: '16px', fontSize: '18px' }}
            rules={[
              {
                required: true,
                message: `请输入${'邮箱'}`,
              },
            ]}
          >
            <Input placeholder={'请输入邮箱'} style={{ height: '38px' }}
              value={account.email}
              disabled
              onChange={(e) => {
                dispath({ type: 'setEmail', payload: e.target.value })
              }}
            />
          </Form.Item>
          <Form.Item
            name={'username'}
            label={'用户名'}
            style={{ marginBottom: '16px', fontSize: '18px' }}
            rules={[
              {
                required: true,
                message: `请输入${'用户名'}`,
              },
            ]}
          >
            <Input placeholder={'请输入用户名'} style={{ height: '38px' }}
              onChange={(e) => {
                dispath({ type: 'setUsername', payload: e.target.value })
              }}
            />
          </Form.Item>
          <Form.Item
            name={'password'}
            label={'密码'}
            style={{ marginBottom: '16px', fontSize: '18px' }}
            rules={[
              {
                required: true,
                message: `请输入${'密码'}`,
              },
            ]}
          >
            <Input placeholder={'请输入密码'} style={{ height: '38px' }}
              type="password"
              onChange={(e) => {
                dispath({ type: 'setPassword', payload: e.target.value })
              }}
            />
          </Form.Item>
          <Flex style={{ alignItems: 'center', justifyContent: 'center', marginTop: '8px' }}>
            <Button style={{ width: '80%', height: '38px' }} type="primary" htmlType="submit" onClick={register} loading={loading}
              disabled={account.username === '' || account.password === ''}
            >注册</Button>
          </Flex>
        </>}
        {(canRegister && current === '找回密码') && <>
          <Form.Item
            name={'password'}
            label={'新密码'}
            style={{ marginBottom: '16px', fontSize: '18px' }}
            rules={[
              {
                required: true,
                message: `请输入${'密码'}`,
              },
            ]}
          >
            <Input placeholder={'请输入密码'} style={{ height: '38px' }}
              type="password"
              onChange={(e) => {
                dispath({ type: 'setPassword', payload: e.target.value })
              }}
            />
          </Form.Item>
          <Form.Item
            name={'newPassword'}
            label={'确认密码'}
            style={{ marginBottom: '16px', fontSize: '18px' }}
            rules={[
              {
                required: true,
                message: `请输入${'密码'}`,
              },
            ]}
          >
            <Input placeholder={'请输入密码'} style={{ height: '38px' }}
              type="password"
              onChange={(e) => {
                dispath({ type: 'setNewPassword', payload: e.target.value })
              }}
            />
          </Form.Item>
          <Flex style={{ alignItems: 'center', justifyContent: 'center', marginTop: '8px' }}>
            <Button style={{ width: '80%', height: '38px' }} type="primary" htmlType="submit" onClick={forget} loading={loading}
            >修改</Button>
          </Flex>
        </>}
      </Form>
    </Modal>
  )
}

export default LoginPanel