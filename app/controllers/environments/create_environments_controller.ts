import Environment from "#models/environment"
import type { HttpContext } from "@adonisjs/core/http"

export default class CreateEnvironmentsController {
  public async handle({ request, auth, response }: HttpContext) {
    const customerId = auth.user?.customerId
    const { name, description, key, isActive } = request.body()

    const environment = await Environment.create({
      customerId,
      name,
      description,
      key,
      isActive
    })

    return response.ok({
      success: true,
      message: 'Environment created successfully',
      data: environment
    })
  }
}