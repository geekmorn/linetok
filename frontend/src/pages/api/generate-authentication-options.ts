import {
  GenerateAuthenticationOptionsOpts,
  generateAuthenticationOptions
} from '@simplewebauthn/server'
import { NextApiRequest, NextApiResponse } from 'next'
import { inMemoryUserDeviceDB, loggedInUserId, rpID } from '.'

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  const user = inMemoryUserDeviceDB[loggedInUserId]

  const _options: GenerateAuthenticationOptionsOpts = {
    timeout: 60000,
    allowCredentials: user.devices.map((device) => ({
      id: device.credentialID,
      type: 'public-key',
      transports: device.transports
    })),
    userVerification: 'required',
    rpID
  }

  const options = generateAuthenticationOptions(_options)
  inMemoryUserDeviceDB[loggedInUserId].currentChallenge = options.challenge

  res.send(options)
}
