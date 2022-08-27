import { baseUrl } from '@config/baseUrl';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import svgCaptcha from 'svg-captcha'

function useAuthCode() {
  const [authcode, setAuthcode] = useState<{ data: string; text: string }>({ data: '', text: '' })

  const createAuthcode = useCallback(async () => {
    const res = await fetch(`${baseUrl}/api/authcode`)
    const data = await res.json()
    setAuthcode(data)
  }, [])

  useEffect(() => {
    createAuthcode()
  }, [createAuthcode])

  const veriftAuthcode = useCallback((code: string) => {
    if (code.toUpperCase() === authcode.text.toUpperCase()) {
      return true
    } else {
      return false
    }
  }, [authcode.text])

  return { veriftAuthcode, authcode, createAuthcode }
}

export default useAuthCode