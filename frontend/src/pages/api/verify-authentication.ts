/* eslint-disable no-console */
import { expectedOrigin, inMemoryUserDeviceDB, loggedInUserId, rpID } from '.'
import base64url from 'base64url'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  VerifiedAuthenticationResponse,
  VerifyAuthenticationResponseOpts,
  verifyAuthenticationResponse
} from '@simplewebauthn/server'
import { AuthenticationCredentialJSON } from '@simplewebauthn/typescript-types'

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
      authenticator: dbAuthenticator,
      credential: body,
      expectedChallenge: `${expectedChallenge}`,
      expectedOrigin,
      expectedRPID: rpID,
      requireUserVerification: true
    }
    verification = await verifyAuthenticationResponse(options)
  } catch ({ message }) {
    console.error(message)
    return res.status(400).send({ error: message })
  }

  const { verified, authenticationInfo } = verification

  if (verified) {
    dbAuthenticator.counter = authenticationInfo.newCounter
  }

  res.send({ verified })
}
