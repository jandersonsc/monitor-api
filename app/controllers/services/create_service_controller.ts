
import Server from "#models/server"
import Service from "#models/service"
import type { HttpContext } from "@adonisjs/core/http"

export default class CreateServiceController {
  public async handle({ request, auth, response }: HttpContext) {
    const customerId = auth.user?.customerId
    const { name, domain, description, isActive, serverId, protocol, port, isMonitoring, isPublic } = request.body()

    if (!serverId) {
      return response.badRequest({
        success: false,
        message: 'Server ID is required'
      })
    }

    const server = await Server.find(serverId)

    if (!server) {
      return response.badRequest({
        success: false,
        message: 'Server not found'
      })
    }

    const service = await Service.create({
      customerId,
      name,
      domain,
      description,
      isActive,
      serverId,
      protocol,
      port,
      isMonitoring,
      isPublic
    })

    return response.ok({
      success: true,
      message: 'Service created successfully',
      data: service
    })
  }
}