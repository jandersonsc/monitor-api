import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'services'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('customer_id').references('id').inTable('customers').notNullable()
      table.integer('server_id').references('id').inTable('servers').notNullable()
      table.string('name').notNullable()
      table.string('description')
      table.string('protocol').notNullable()
      table.integer('port').notNullable()
      table.enum('status', ['running', 'stopped', 'error']).notNullable().defaultTo('stopped')
      table.boolean('is_public').notNullable().defaultTo(false)
      table.boolean('is_monitoring').notNullable().defaultTo(false)
      table.boolean('is_active').notNullable().defaultTo(false)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
