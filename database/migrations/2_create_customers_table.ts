import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'customers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('document').unique().notNullable()
      table.enum('document_type', ['cpf', 'cnpj']).notNullable().defaultTo('cpf')
      table.string('email')
      table.string('phone')
      table.string('address')
      table.string('city')
      table.string('state')
      table.string('zip')
      table.string('country').notNullable().defaultTo('Brazil')
      table.boolean('is_active').notNullable().defaultTo(true)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}