import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'services_versions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('customer_id').unsigned().references('id').inTable('customers').notNullable()
      table.bigInteger('service_id').unsigned().references('id').inTable('services')
      table.bigInteger('server_id').unsigned().references('id').inTable('servers')
      table.bigInteger('environment_id').unsigned().references('id').inTable('environments')
      table.string('version')
      table.string('description')
      table.enum('status', ['pending', 'progress', 'success', 'failed']).defaultTo('pending')
      table.timestamp('completed_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}