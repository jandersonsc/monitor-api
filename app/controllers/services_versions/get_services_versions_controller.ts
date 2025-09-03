import ServicesVersion from "#models/services_version"
import type { HttpContext } from "@adonisjs/core/http"

export default class GetServicesVersionsController {
  public async handle({ auth, response }: HttpContext) {

    const customerId = auth.user?.customerId
    const servicesVersions = await this.getServicesVersions(customerId as number)

    return response.ok({
      success: true,
      message: 'Services versions fetched successfully',
      data: servicesVersions
    })
  }

  private async getServicesVersions(customerId: number) {

    const servicesWithVersions = await this.getServicesWithVersions(customerId) as unknown as any[]

    const servicesVersions = await Promise.all(servicesWithVersions.map(async (service) => {
      const serviceVersion = await this.getServicesVersionsByServiceId(service.serviceId)
      return serviceVersion?.toJSON()
    }))

    return servicesVersions
  }

  private async getServicesVersionsByServiceId(serviceId: number) {
    return await ServicesVersion.query()
      .where('service_id', serviceId)
      .preload('service', (query) => {
        query.select('id', 'name')
      })
      .preload('server', (query) => {
        query.select('id', 'name')
      })
      .preload('environment', (query) => {
        query.select('id', 'name')
      })
      .orderBy('id', 'desc')
      .first()
  }

  private async getServicesWithVersions(customerId: number) {
    const services = await ServicesVersion.query()
      .where('customer_id', customerId)
      .select('service_id')
      .groupBy('service_id')

    return services
  }
}