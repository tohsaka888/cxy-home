import React, { useCallback, useEffect, useRef, useState } from 'react'

function useTiming(timer: number) {
  const [timing, setTiming] = useState<number>(timer)
  const intervalRef = useRef<number>(-1)
  const [reRun, setReRun] = useState<boolean>(false)

  useEffect(() => {
    if (reRun) {
      intervalRef.current = window.setInterval(() => {
        console.log('run')
        setTiming((time) => time - 1000)
      }, 1000)
    }

    // return () => {
    //   window.clearInterval(intervalRef.current)
    //   setReRun(false)
    // }
  }, [reRun])

  useEffect(() => {
    if (timing < 1) {
      window.clearInterval(intervalRef.current)
      setReRun(false)
    }
  }, [timing])

  const reset = useCallback(() => {
    setReRun(true)
    setTiming(timer)
  }, [timer])

  return { timing, reset }
}

export default useTiming