import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import User from '#models/user'

@inject()
export default class UsersController {

  public async handle({ response, auth }: HttpContext) {
    const user = auth.user as User

    const users = await User.query().where('customer_id', user.customerId)

    return response.status(200).json(users)
  }
}
