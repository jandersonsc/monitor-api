import Environment from "#models/environment"
import Server from "#models/server"
import type { HttpContext } from "@adonisjs/core/http"

export default class CreateServerController {
  public async handle({ request, auth, response }: HttpContext) {
    const customerId = auth.user?.customerId
    const { name, host, description, key, isActive, environmentId } = request.body()

    if (!environmentId) {
      return response.badRequest({
        success: false,
        message: 'Environment ID is required'
      })
    }

    const environment = await Environment.find(environmentId)

    if (!environment) {
      return response.badRequest({
        success: false,
        message: 'Environment not found'
      })
    }

    const server = await Server.create({
      customerId,
      name,
      host,
      description,
      key,
      isActive,
      environmentId
    })

    return response.ok({
      success: true,
      message: 'Server created successfully',
      data: server
    })
  }
}