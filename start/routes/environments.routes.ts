
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const CreateEnvironmentsController = () => import('#controllers/environments/create_environments_controller')
const GetEnvironmentsController = () => import('#controllers/environments/get_environments_controller')

export default function environmentsRoutes() {
  router
    .group(() => {
      router.post('/', [CreateEnvironmentsController, 'handle']).as('environments.create')
      router.get('/', [GetEnvironmentsController, 'handle']).as('environments.index')
    })
    .use(middleware.auth({ guards: ['api'] }))
    .prefix('environments')
}
