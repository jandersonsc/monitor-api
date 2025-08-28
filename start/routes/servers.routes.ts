
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const CreateServerController = () => import('#controllers/servers/create_server_controller')
const GetServersController = () => import('#controllers/servers/get_servers_controller')

export default function serversRoutes() {
  router
    .group(() => {
      router.post('/', [CreateServerController, 'handle']).as('servers.create')
      router.get('/', [GetServersController, 'handle']).as('servers.index')
    })
    .use(middleware.auth({ guards: ['api'] }))
    .prefix('servers')
}
