import { customerSignUpValidator } from '#validators/customer'
import Customer from '#models/customer'
import User from '#models/user'

export default class SignUpService {
  public async handle(data: any) {
    try {
      ;(await customerSignUpValidator.validate(data)) as any
      const customerPayload = this.generateCustomerPayload(data)
      const customer = await Customer.create(customerPayload)

      if (!customer) {
        return {
          success: false,
          message: 'Customer not created',
        }
      }

      const userPayload = this.generateUserPayload(data, customer)
      const user = await User.create(userPayload)

      if (!user) {
        return {
          success: false,
          message: 'User not created',
        }
      }

      return {
        success: true,
        message: 'Customer created successfully',
        data: customer,
      }
    } catch (error) {
      return {
        success: false,
        message: 'Error creating customer',
        data: error.messages,
        error: error,
      }
    }
  }

  private generateCustomerPayload(data: any) {
    return {
      name: data.name,
      document: data.document,
      documentType: data.documentType,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zip,
    }
  }

  private generateUserPayload(data: any, customer: any) {
    return {
      customerId: customer.id,
      name: data.name,
      email: data.email,
      password: data.password,
      isActive: data.isActive,
      roleId: 1,
    }
  }
}
