import vine from '@vinejs/vine'

export const customerSignUpValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(255),
    document: vine
      .string()
      .minLength(11)
      .maxLength(14)
      .unique({ table: 'customers', column: 'document' }),
    email: vine.string().email().unique({ table: 'customers', column: 'email' }),
    password: vine.string().minLength(8).maxLength(255),
    confirmPassword: vine
      .string()
      .minLength(8)
      .maxLength(255)
      .confirmed({ confirmationField: 'password' }),
    phone: vine.string().minLength(11).maxLength(15).optional(),
    address: vine.string().minLength(3).maxLength(255).optional(),
    number: vine.string().minLength(1).maxLength(10).optional(),
    complement: vine.string().minLength(3).maxLength(255).optional(),
    neighborhood: vine.string().minLength(3).maxLength(255).optional(),
    city: vine.string().minLength(3).maxLength(255).optional(),
    state: vine.string().minLength(2).maxLength(2).optional(),
    zipCode: vine.string().minLength(8).maxLength(9).optional(),
    country: vine.string().minLength(3).maxLength(255).optional(),
  })
)
