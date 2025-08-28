import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const CreateLogsController = () => import('#controllers/logs/create_logs_controller')
const GetLogsController = () => import('#controllers/logs/get_logs_controller')
const GetLogController = () => import('#controllers/logs/get_log_controller')

export default function logsRoutes() {
  router
    .group(() => {
      router.post('/', [CreateLogsController, 'handle']).as('logs.create')

      router.group(() => {
        router.get('/', [GetLogsController, 'handle']).as('logs.index')
        router.get('/:id', [GetLogController, 'handle']).as('logs.show')
      })
      .use(middleware.auth({ guards: ['api'] }))
    })
    .prefix('logs')
}
