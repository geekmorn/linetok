import {
  generateRegistrationOptions,
  GenerateRegistrationOptionsOpts
} from '@simplewebauthn/server'
import { NextApiRequest, NextApiResponse } from 'next'
import { inMemoryUserDeviceDB, loggedInUserId, rpID } from '.'

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  const user = inMemoryUserDeviceDB[loggedInUserId]

  const { username, devices } = user

  const opts: GenerateRegistrationOptionsOpts = {
    rpName: 'SimpleWebAuthn Example',
    rpID,
    userID: loggedInUserId,
    userName: username,
    timeout: 60000,
    attestationType: 'none',
    excludeCredentials: devices.map((dev) => ({
      id: dev.credentialID,
      type: 'public-key',
      transports: dev.transports
    })),
    supportedAlgorithmIDs: [-7, -257]
  }

  const options = generateRegistrationOptions(opts)
  inMemoryUserDeviceDB[loggedInUserId].currentChallenge = options.challenge

  res.send(options)
}
