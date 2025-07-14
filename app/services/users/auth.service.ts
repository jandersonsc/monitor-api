import User from "#models/user"

export default class AuthService {
  public async handle(data: any) {
    try {
      const user = await User.verifyCredentials(data.email, data.password)

      if (!user) {
        return {
          success: false,
          message: 'Invalid credentials',
        }
      }

      const token = await User.accessTokens.create(user)

      return {
        success: true,
        message: 'User authenticated successfully',
        data: {
          user: user,
          token: token.toJSON().token,
          permissions: token.toJSON().abilities,
        },
      }
    } catch (error) {
      return {
        success: false,
        message: 'Error authenticating user',
      }
    }
  }
}