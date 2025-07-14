import router from '@adonisjs/core/services/router'
const SignUpController = () => import('#controllers/customers/signup_controller')

export default function customerRoutes() {
  router
    .group(() => {
      router.post('/signup', [SignUpController, 'handle']).as('customers.signup')
    })
    .prefix('customers')
}
