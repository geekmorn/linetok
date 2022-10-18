import { useEffect, useState } from 'react'
import { nextAPIClient } from 'common/clients'
import { NEXT_API } from 'common/constants'
import { WARNING_BIOMETRY_UNSUPPORTED } from 'common/i18n'
import { useToast } from '@chakra-ui/react'
import {
  browserSupportsWebAuthn,
  startAuthentication,
  startRegistration
} from '@simplewebauthn/browser'
import {
  AuthenticationCredentialJSON,
  PublicKeyCredentialCreationOptionsJSON,
  RegistrationCredentialJSON
} from '@simplewebauthn/typescript-types'

type Parameters = {
  isRegistrationMode: boolean
}

export const useBiometrics = () => {
  const toast = useToast()
  const [isBrowserSupported, setIsBrowserSupported] = useState(false)

  const authorize = async (parameters: Parameters): Promise<boolean> => {
    const { isRegistrationMode } = parameters

    if (!isBrowserSupported) {
      toast(WARNING_BIOMETRY_UNSUPPORTED)
      return false
    }

    const options: PublicKeyCredentialCreationOptionsJSON = await nextAPIClient
      .get(
        isRegistrationMode
          ? NEXT_API.generateRegistrationOptions
          : NEXT_API.generateAuthenticationOptions
      )
      .then((response) => response.data)

    const credentials:
      | RegistrationCredentialJSON
      | AuthenticationCredentialJSON = isRegistrationMode
      ? await startRegistration(options)
      : await startAuthentication(options)

    const verified: boolean = await nextAPIClient
      .post(
        isRegistrationMode
          ? NEXT_API.verifyRegistration
          : NEXT_API.verifyAuthentication,
        credentials
      )
      .then((response) => response.data.verified)
      .catch((e) => {
        console.error(e)
        return false
      })

    return verified
  }

  useEffect(() => {
    setIsBrowserSupported(browserSupportsWebAuthn())
  }, [])

  return { authorize, isBrowserSupported }
}
