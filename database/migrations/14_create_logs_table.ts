import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'logs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('customer_id').references('id').inTable('customers').notNullable()
      table.integer('service_id').references('id').inTable('services').notNullable()
      table.string('type')
      table.string('message')
      table.enum('level', ['info', 'warning', 'error', 'success']).notNullable().defaultTo('info')
      table.string('request')
      table.text('data')
      table.integer('duration')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
