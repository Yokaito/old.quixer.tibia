/* eslint-disable no-unused-vars */
import 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's name. */
      id: string
      name: string
      email: string
      type: number
      premiumDays: number
      coins: number
      coinsTransferable: number
    }
  }
}
