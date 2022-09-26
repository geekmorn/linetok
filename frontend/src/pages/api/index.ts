import type { AuthenticatorDevice } from '@simplewebauthn/typescript-types'

interface LoggedInUser {
  id: string
  username: string
  devices: AuthenticatorDevice[]
  currentChallenge?: string
}

const { RP_ID = 'localhost' } = process.env

export const rpID = RP_ID
export const expectedOrigin = 'http://localhost:3000'
export const loggedInUserId = 'internalUserId'

export const inMemoryUserDeviceDB: { [loggedInUserId: string]: LoggedInUser } =
  {
    [loggedInUserId]: {
      currentChallenge: undefined,
      devices: [],
      id: loggedInUserId,
      username: `user@${rpID}`
    }
  }
