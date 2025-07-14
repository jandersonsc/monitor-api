import AuthService from '#services/users/auth.service'
import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

@inject()
export default class AuthController {
  constructor(private authService: AuthService) {}

  public async handle({ request, response }: HttpContext) {
    const result = await this.authService.handle(request.all())

    if (!result.success) {
      return response.status(401).json(result)
    }

    return response.status(200).json(result)
  }
}
