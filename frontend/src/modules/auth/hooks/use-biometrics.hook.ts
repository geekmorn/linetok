import { nextAPIClient } from 'common/clients'
import { useToast, UseToastOptions } from '@chakra-ui/react'
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

const WARNING_BIOMETRY_UNSUPPORTED: UseToastOptions = {
  description: "Your browser doesn't support biometry.",
  status: 'warning'
}

export const useBiometrics = () => {
  const toast = useToast()

  const authorize = async (parameters: Parameters): Promise<boolean> => {
    const { isRegistrationMode } = parameters

    if (!browserSupportsWebAuthn()) {
      toast(WARNING_BIOMETRY_UNSUPPORTED)
      return false
    }

    const options: PublicKeyCredentialCreationOptionsJSON = await nextAPIClient
      .get(
        isRegistrationMode
          ? '/generate-registration-options'
          : '/generate-authentication-options'
      )
      .then((response) => response.data)

    const credentials:
      | RegistrationCredentialJSON
      | AuthenticationCredentialJSON = isRegistrationMode
      ? await startRegistration(options)
      : await startAuthentication(options)

    const verified: boolean = await nextAPIClient
      .post(
        isRegistrationMode ? '/verify-registration' : '/verify-authentication',
        credentials
      )
      .then((response) => response.data.verified)
      .catch((e) => {
        console.error(e)
        return false
      })

    return verified
  }

  return { authorize }
}
