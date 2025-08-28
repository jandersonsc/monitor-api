import Log from "#models/log"
import type { HttpContext } from "@adonisjs/core/http"

export default class GetLogsController {
  public async handle({ request, auth, response }: HttpContext) {
    const filters = request.qs()
    const customerId = auth.user?.customerId as number

    const log = Log.query()
      .where('customer_id', customerId)
      .preload('service', (query) => {
        query.select('id', 'name')
      })

    if (filters.servicesIds) {
      const servicesIds = filters.servicesIds.split(',')
      log.whereIn('service_id', servicesIds)
    }

    if (filters.serverId) {
      log.whereHas('service', (query) => {
        query.where('server_id', filters.serverId)
      })
    }

    if (filters.startDate) {
      log.where('created_at', '>=', filters.startDate)
    }

    if (filters.endDate) {
      log.where('created_at', '<=', filters.endDate)
    }

    if (filters.level) {
      const levels = filters.level.split(',')
      log.whereIn('level', levels)
    }

    const result = await log.paginate(filters.page || 1, filters.perPage || 10)

    return response.ok({
      success: true,
      message: 'Logs fetched successfully',
      data: result.toJSON().data,
      meta: result.toJSON().meta
    })
  }
}