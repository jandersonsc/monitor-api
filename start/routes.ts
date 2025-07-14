import router from '@adonisjs/core/services/router'
import customerRoutes from '#start/routes/customers.routes'
import userRoutes from '#start/routes/users.routes'

router
  .group(() => {
    userRoutes()
    customerRoutes()
  })
  .prefix('api/v1')
