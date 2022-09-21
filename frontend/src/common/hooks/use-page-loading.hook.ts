import { useCallback, useEffect, useState } from 'react'
import Router from 'next/router'

export const usePageLoading = (): boolean => {
  const [loading, setLoading] = useState(false)

  const routeEventStart = () => {
    setLoading(true)
  }
  const routeEventEnd = () => {
    setLoading(false)
  }

  const enableEvents = useCallback(() => {
    Router.events.on('routeChangeStart', routeEventStart)
    Router.events.on('routeChangeComplete', routeEventEnd)
    Router.events.on('routeChangeError', routeEventEnd)
  }, [])

  const disableEvents = useCallback(() => {
    Router.events.off('routeChangeStart', routeEventStart)
    Router.events.off('routeChangeComplete', routeEventEnd)
    Router.events.off('routeChangeError', routeEventEnd)
  }, [])

  useEffect(() => {
    enableEvents()
    return () => disableEvents()
  })

  return loading
}
