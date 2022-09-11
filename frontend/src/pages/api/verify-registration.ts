import {
  VerifiedRegistrationResponse,
  verifyRegistrationResponse,
  VerifyRegistrationResponseOpts
} from '@simplewebauthn/server'
import {
  AuthenticatorDevice,
  RegistrationCredentialJSON
} from '@simplewebauthn/typescript-types'
import { NextApiRequest, NextApiResponse } from 'next'
import { expectedOrigin, inMemoryUserDeviceDB, loggedInUserId, rpID } from '.'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body: RegistrationCredentialJSON = req.body
  const user = inMemoryUserDeviceDB[loggedInUserId]
  const expectedChallenge = user.currentChallenge
  let verification: VerifiedRegistrationResponse

  try {
    const opts: VerifyRegistrationResponseOpts = {
      credential: body,
      expectedChallenge: `${expectedChallenge}`,
      expectedOrigin,
      expectedRPID: rpID,
      requireUserVerification: true
    }
    verification = await verifyRegistrationResponse(opts)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error)
    return res.status(400).send({ error: error.message })
  }

  const { verified, registrationInfo } = verification

  if (verified && registrationInfo) {
    const { credentialPublicKey, credentialID, counter } = registrationInfo

    const existingDevice = user.devices.find((device) =>
      device.credentialID.equals(credentialID)
    )

    if (!existingDevice) {
      const newDevice: AuthenticatorDevice = {
        credentialPublicKey,
        credentialID,
        counter,
        transports: body.transports
      }
      user.devices.push(newDevice)
    }
  }

  res.send({ verified })
}
