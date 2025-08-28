import Service from "#models/service"
import type { HttpContext } from "@adonisjs/core/http"

export default class GetServicesController {
  public async handle({ auth, response }: HttpContext) {
    const customerId = auth.user?.customerId

    const services = await Service.query().where('customer_id', customerId as number)

    return response.ok({
      success: true,
      message: 'Services fetched successfully',
      data: services
    })
  }
}