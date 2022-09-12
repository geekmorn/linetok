import {
  VerifiedAuthenticationResponse,
  VerifyAuthenticationResponseOpts,
  verifyAuthenticationResponse
} from '@simplewebauthn/server'
import { AuthenticationCredentialJSON } from '@simplewebauthn/typescript-types'
import base64url from 'base64url'
import { NextApiRequest, NextApiResponse } from 'next'
import { inMemoryUserDeviceDB, loggedInUserId, expectedOrigin, rpID } from '.'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body: AuthenticationCredentialJSON = req.body
  const user = inMemoryUserDeviceDB[loggedInUserId]
  const expectedChallenge = user.currentChallenge

  let dbAuthenticator
  const bodyCredIDBuffer = base64url.toBuffer(body.rawId)

  for (const device of user.devices) {
    if (device.credentialID.equals(bodyCredIDBuffer)) {
      dbAuthenticator = device
      break
    }
  }

  if (!dbAuthenticator) {
    return res.status(400).send({ error: 'Authenticator is not registered' })
  }

  let verification: VerifiedAuthenticationResponse
  try {
    const options: VerifyAuthenticationResponseOpts = {
      credential: body,
      expectedChallenge: `${expectedChallenge}`,
      expectedOrigin,
      expectedRPID: rpID,
      authenticator: dbAuthenticator,
      requireUserVerification: true
    }
    verification = await verifyAuthenticationResponse(options)
  } catch (e: any) {
    console.error(e)
    return res.status(400).send({ error: e.message })
  }

  const { verified, authenticationInfo } = verification

  if (verified) {
    dbAuthenticator.counter = authenticationInfo.newCounter
  }

  res.send({ verified })
}
