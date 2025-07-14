import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'jobs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('customer_id').references('id').inTable('customers').notNullable()
      table.integer('service_id').references('id').inTable('services').notNullable()
      table.string('name').notNullable()
      table.string('description')
      table.string('command').notNullable()
      table.string('cron').notNullable()
      table.boolean('is_active').notNullable().defaultTo(false)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
