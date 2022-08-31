import { loginUrl } from '@config/baseUrl'
import React from 'react'
import useSWR from 'swr'

function useLoginStatus() {

  const loginStatusUrl = `${loginUrl}/api/login/status`

  const { data: username } = useSWR<string>(loginStatusUrl, async (url) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: localStorage.getItem('token') })
    })
    const data = await res.json()
    if (data.success) {
      return data.result.username
    } else {
      return undefined
    }
  })

  return username
}

export default useLoginStatus