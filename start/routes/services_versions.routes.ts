
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const CreateServiceVersionController = () => import('#controllers/services_versions/create_service_version_controller')
const GetServicesVersionsController = () => import('#controllers/services_versions/get_services_versions_controller')

export default function servicesVersionsRoutes() {
  router
    .group(() => {
      router.post('/', [CreateServiceVersionController, 'handle']).as('services_versions.create')
      router.get('/', [GetServicesVersionsController, 'handle']).as('services_versions.index')
    })
    .use(middleware.auth({ guards: ['api'] }))
    .prefix('services-versions')
}
