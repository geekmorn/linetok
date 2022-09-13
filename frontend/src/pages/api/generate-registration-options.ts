import { NextApiRequest, NextApiResponse } from 'next'
import {
  GenerateRegistrationOptionsOpts,
  generateRegistrationOptions
} from '@simplewebauthn/server'
import { inMemoryUserDeviceDB, loggedInUserId, rpID } from '.'

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  const user = inMemoryUserDeviceDB[loggedInUserId]

  const { username, devices } = user

  const _options: GenerateRegistrationOptionsOpts = {
    rpName: 'Linetok',
    rpID,
    userID: loggedInUserId,
    userName: username,
    timeout: 60000,
    attestationType: 'none',
    excludeCredentials: devices.map((device) => ({
      id: device.credentialID,
      type: 'public-key',
      transports: device.transports
    })),
    supportedAlgorithmIDs: [-7, -257]
  }

  const options = generateRegistrationOptions(_options)
  inMemoryUserDeviceDB[loggedInUserId].currentChallenge = options.challenge

  res.send(options)
}
