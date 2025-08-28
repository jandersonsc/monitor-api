import Environment from "#models/environment"
import type { HttpContext } from "@adonisjs/core/http"

export default class GetEnvironmentsController {
  public async handle({ auth, response }: HttpContext) {
    const customerId = auth.user?.customerId

    const environments = await Environment.query().where('customer_id', customerId as number)

    return response.ok({
      success: true,
      message: 'Environments fetched successfully',
      data: environments
    })
  }
}