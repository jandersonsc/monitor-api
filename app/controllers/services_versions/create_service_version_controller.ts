import ServiceVersion from "#models/services_version"
import Service from "#models/service"
import type { HttpContext } from "@adonisjs/core/http"

export default class CreateServiceVersionController {
  public async handle({ request, auth, response }: HttpContext) {
    const customerId = auth.user?.customerId
    const { serviceId, serverId, environmentId, version, description } = request.body()

    if (!serviceId) {
      return response.badRequest({
        success: false,
        message: 'Service ID is required'
      })
    }

    const service = await Service.find(serviceId)

    if (!service) {
      return response.badRequest({
        success: false,
        message: 'Service not found'
      })
    }

    const serviceVersion = await ServiceVersion.create({
      serviceId,
      serverId,
      environmentId,
      version,
      description,
      customerId: customerId as number
    })

    return response.ok({
      success: true,
      message: 'Service version created successfully',
      data: serviceVersion
    })
  }
}