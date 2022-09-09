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

  for (const dev of user.devices) {
    if (dev.credentialID.equals(bodyCredIDBuffer)) {
      dbAuthenticator = dev
      break
    }
  }

  if (!dbAuthenticator) {
    return res
      .status(400)
      .send({ error: 'Authenticator is not registered with this site' })
  }

  let verification: VerifiedAuthenticationResponse
  try {
    const opts: VerifyAuthenticationResponseOpts = {
      credential: body,
      expectedChallenge: `${expectedChallenge}`,
      expectedOrigin,
      expectedRPID: rpID,
      authenticator: dbAuthenticator,
      requireUserVerification: true
    }
    verification = await verifyAuthenticationResponse(opts)
  } catch (error) {
    const _error = error as Error
    console.error(_error)
    return res.status(400).send({ error: _error.message })
  }

  const { verified, authenticationInfo } = verification

  if (verified) {
    dbAuthenticator.counter = authenticationInfo.newCounter
  }

  res.send({ verified })
}
