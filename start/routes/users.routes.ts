import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/users/auth_controller')
const UsersController = () => import('#controllers/users/users_controller')

export default function userRoutes() {
  router
    .group(() => {
      router.post('/auth', [AuthController, 'handle']).as('users.auth')

      router
        .group(() => {
          router.get('/', [UsersController, 'handle']).as('users.me')
        })
        .use(
          middleware.auth({
            guards: ['api'],
          })
        )
    })
    .prefix('users')
}
