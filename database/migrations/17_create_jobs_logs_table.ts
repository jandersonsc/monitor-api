import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'jobs_logs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('customer_id').references('id').inTable('customers').notNullable()
      table.integer('job_id').references('id').inTable('jobs').notNullable()
      table.enum('status', ['running', 'stopped', 'error']).notNullable().defaultTo('stopped')
      table.text('request')
      table.text('response')
      table.integer('duration')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
