import { useEffect, useState } from 'react'
import { useEvent } from 'react-use-event-hook'
import Router from 'next/router'

export const usePageLoading = (): boolean => {
  const [loading, setLoading] = useState(false)

  const routeEventStart = () => {
    setLoading(true)
  }
  const routeEventEnd = () => {
    setLoading(false)
  }

  const enableEvents = useEvent(() => {
    Router.events.on('routeChangeStart', routeEventStart)
    Router.events.on('routeChangeComplete', routeEventEnd)
    Router.events.on('routeChangeError', routeEventEnd)
  })

  const disableEvents = useEvent(() => {
    Router.events.off('routeChangeStart', routeEventStart)
    Router.events.off('routeChangeComplete', routeEventEnd)
    Router.events.off('routeChangeError', routeEventEnd)
  })

  useEffect(() => {
    enableEvents()
    return () => disableEvents()
  })

  return loading
}
