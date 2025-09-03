import router from '@adonisjs/core/services/router'
import customerRoutes from '#start/routes/customers.routes'
import userRoutes from '#start/routes/users.routes'
import environmentsRoutes from '#start/routes/environments.routes'
import serversRoutes from '#start/routes/servers.routes'
import servicesRoutes from '#start/routes/services.routes'
import logsRoutes from '#start/routes/logs.routes'
import servicesVersionsRoutes from '#start/routes/services_versions.routes'

router
  .group(() => {
    userRoutes()
    customerRoutes()
    environmentsRoutes()
    serversRoutes()
    servicesRoutes()
    logsRoutes()
    servicesVersionsRoutes()
  })
  .prefix('api/v1')
