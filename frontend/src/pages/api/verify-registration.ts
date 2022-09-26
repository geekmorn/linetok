import { expectedOrigin, inMemoryUserDeviceDB, loggedInUserId, rpID } from '.'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  VerifiedRegistrationResponse,
  VerifyRegistrationResponseOpts,
  verifyRegistrationResponse
} from '@simplewebauthn/server'
import {
  AuthenticatorDevice,
  RegistrationCredentialJSON
} from '@simplewebauthn/typescript-types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body: RegistrationCredentialJSON = req.body
  const user = inMemoryUserDeviceDB[loggedInUserId]
  const expectedChallenge = user.currentChallenge

  let verification: VerifiedRegistrationResponse
  try {
    const options: VerifyRegistrationResponseOpts = {
      credential: body,
      expectedChallenge: `${expectedChallenge}`,
      expectedOrigin,
      expectedRPID: rpID,
      requireUserVerification: true
    }
    verification = await verifyRegistrationResponse(options)
  } catch (e: any) {
    console.error(e)
    return res.status(400).send({ error: e.message })
  }

  const { verified, registrationInfo } = verification

  if (verified && registrationInfo) {
    const { credentialPublicKey, credentialID, counter } = registrationInfo

    const existingDevice = user.devices.find((device) =>
      device.credentialID.equals(credentialID)
    )

    if (!existingDevice) {
      const newDevice: AuthenticatorDevice = {
        counter,
        credentialID,
        credentialPublicKey,
        transports: body.transports
      }
      user.devices.push(newDevice)
    }
  }

  res.send({ verified })
}
