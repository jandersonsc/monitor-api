import Service from "#models/service"
import type { HttpContext } from "@adonisjs/core/http"

export default class GetServicesController {
  public async handle({ auth, response }: HttpContext) {
    const customerId = auth.user?.customerId

    const services = await Service.query()
      .where('customer_id', customerId as number)
      .preload('versions', (query) => {
        query.select('id', 'version', 'status', 'completed_at').orderBy('id', 'desc').first()
      })
      .preload('server', (query) => {
        query.select('id', 'name', 'environment_id')
        .preload('environment', (query) => {
          query.select('id', 'name')
        })
      })

    return response.ok({
      success: true,
      message: 'Services fetched successfully',
      data: services
    })
  }
}