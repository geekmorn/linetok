import { inMemoryUserDeviceDB, loggedInUserId, rpID } from '.'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  GenerateAuthenticationOptionsOpts,
  generateAuthenticationOptions
} from '@simplewebauthn/server'

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  const user = inMemoryUserDeviceDB[loggedInUserId]

  const _options: GenerateAuthenticationOptionsOpts = {
    allowCredentials: user.devices.map((device) => ({
      id: device.credentialID,
      transports: device.transports,
      type: 'public-key'
    })),
    rpID,
    timeout: 60000,
    userVerification: 'required'
  }

  const options = generateAuthenticationOptions(_options)
  inMemoryUserDeviceDB[loggedInUserId].currentChallenge = options.challenge

  res.send(options)
}
