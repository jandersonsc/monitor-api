import Log from "#models/log"
import Service from "#models/service"
import type { HttpContext } from "@adonisjs/core/http"

export default class CreateLogsController {
  public async handle({ request, response }: HttpContext) {
    //const customerId = auth.user?.customerId
    const publicKey = request.header('api-key')
    const { type, message, level, duration } = request.body()

    if (!publicKey) {
      return response.badRequest({
        success: false,
        message: 'Public key is required'
      })
    }

    const service = await Service.findBy('public_key', publicKey)

    if (!service) {
      return response.badRequest({
        success: false,
        message: 'Service not found'
      })
    }

    const requestText = request.body().request
    if (typeof requestText == 'object') {
      request.body().request = JSON.stringify(requestText, null, 2)
    }

    const dataText = request.body().data
    if (typeof dataText == 'object') {
      request.body().data = JSON.stringify(dataText, null, 2)
    }

    const log = await Log.create({
      customerId: service.customerId,
      serviceId: service.id,
      type,
      message,
      level,
      data: request.body().data,
      duration,
      request: request.body().request
    })

    return response.ok({
      success: true,
      message: 'Log created successfully',
      data: log
    })
  }
}