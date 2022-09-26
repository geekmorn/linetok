import { useLayoutEffect, useState } from 'react'
import { browserSupportsWebAuthn } from '@simplewebauthn/browser'

export const useBrowserSupportsWebAuthn = () => {
  const [supports, setSupports] = useState(false)

  useLayoutEffect(() => {
    setSupports(browserSupportsWebAuthn())
  }, [])

  return supports
}
