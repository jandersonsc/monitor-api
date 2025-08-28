
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const CreateServiceController = () => import('#controllers/services/create_service_controller')
const GetServicesController = () => import('#controllers/services/get_services_controller')

export default function servicesRoutes() {
  router
    .group(() => {
      router.post('/', [CreateServiceController, 'handle']).as('services.create')
      router.get('/', [GetServicesController, 'handle']).as('services.index')
    })
    .use(middleware.auth({ guards: ['api'] }))
    .prefix('services')
}
