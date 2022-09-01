import { competitionUrl } from '@config/baseUrl'
import React from 'react'
import useSWR from 'swr'

type Props = {
  id: string;
   username?: string;
   onSuccess: (data: boolean, key: string) => void
}

function useIsSignUp({id, username, onSuccess}: Props) {
  const { data: isSignUp, error } = useSWR<boolean>(username ? `${competitionUrl}/api/competition/is-sign-up/${id}` : null, async (url) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
    const data = await res.json()
    return data.isSignUp
  }, {
    refreshInterval: 100,
    onSuccess: onSuccess
  })

  return { isSignUp, loading: isSignUp === undefined }
}

export default useIsSignUp