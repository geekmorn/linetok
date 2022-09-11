import {
  GenerateAuthenticationOptionsOpts,
  generateAuthenticationOptions
} from '@simplewebauthn/server'
import { NextApiRequest, NextApiResponse } from 'next'
import { inMemoryUserDeviceDB, loggedInUserId, rpID } from '.'

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  const user = inMemoryUserDeviceDB[loggedInUserId]

  const opts: GenerateAuthenticationOptionsOpts = {
    timeout: 60000,
    allowCredentials: user.devices.map((dev) => ({
      id: dev.credentialID,
      type: 'public-key',
      transports: dev.transports
    })),
    userVerification: 'required',
    rpID
  }

  const options = generateAuthenticationOptions(opts)
  inMemoryUserDeviceDB[loggedInUserId].currentChallenge = options.challenge

  res.send(options)
}
