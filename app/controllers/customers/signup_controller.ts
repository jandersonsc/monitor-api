import SignUpService from '#services/customers/signup.service'
import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

@inject()
export default class SignUpController {
  constructor(private signUpService: SignUpService) {}

  public async handle({ request, response }: HttpContext) {
    const data = request.all()
    const result = await this.signUpService.handle(data)

    if (!result.success) {
      return response.status(422).json(result)
    }

    return response.status(201).json(result)
  }
}
