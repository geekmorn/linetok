import { browserSupportsWebAuthn } from '@simplewebauthn/browser'
import { useLayoutEffect, useState } from 'react'

export const useBrowserSupportsWebAuthn = () => {
  const [supports, setSupports] = useState(false)

  useLayoutEffect(() => {
    setSupports(browserSupportsWebAuthn())
  }, [])

  return supports
}
