import { inMemoryUserDeviceDB, loggedInUserId, rpID } from '.'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  GenerateRegistrationOptionsOpts,
  generateRegistrationOptions
} from '@simplewebauthn/server'

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  const user = inMemoryUserDeviceDB[loggedInUserId]

  const { username, devices } = user

  const _options: GenerateRegistrationOptionsOpts = {
    attestationType: 'none',
    excludeCredentials: devices.map((device) => ({
      id: device.credentialID,
      transports: device.transports,
      type: 'public-key'
    })),
    rpID,
    rpName: 'Linetok',
    supportedAlgorithmIDs: [-7, -257],
    timeout: 60000,
    userID: loggedInUserId,
    userName: username
  }

  const options = generateRegistrationOptions(_options)
  inMemoryUserDeviceDB[loggedInUserId].currentChallenge = options.challenge

  res.send(options)
}
