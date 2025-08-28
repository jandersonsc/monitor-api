import Server from "#models/server"
import type { HttpContext } from "@adonisjs/core/http"

export default class GetServersController {
  public async handle({ request, auth, response }: HttpContext) {
    const customerId = auth.user?.customerId

    const servers = await Server.query().where('customer_id', customerId)

    return response.ok({
      success: true,
      message: 'Servers fetched successfully',
      data: servers
    })
  }
}