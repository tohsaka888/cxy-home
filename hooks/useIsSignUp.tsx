import { competitionUrl } from '@config/baseUrl'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'

function useIsSignUp(id: string, username?: string) {
  const { data: isSignUp } = useSWR<boolean>(username ? `${competitionUrl}/api/competition/is-sign-up/${id}` : null, async (url) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
    const data = await res.json()
    return data.isSignUp
  })

  return isSignUp
}

export default useIsSignUp