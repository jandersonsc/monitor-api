import Log from "#models/log"
import type { HttpContext } from "@adonisjs/core/http"

export default class GetLogController {
  public async handle({ request, auth, response }: HttpContext) {
    const customerId = auth.user?.customerId as number
    const logId = request.param('id')

    if (!logId) {
      return response.badRequest({
        success: false,
        message: 'Log ID is required'
      })
    }

    const log = await Log.query()
      .where('customer_id', customerId)
      .where('id', logId)
      .preload('service', (query) => {
        query.select('id', 'name', 'server_id')
          .preload('server', (query) => {
            query.select('id', 'name', 'environment_id').preload('environment', (query) => {
              query.select('id', 'name')
            })
          })
      }).first()

    return response.ok({
      success: true,
      message: 'Log fetched successfully',
      data: log
    })
  }
}