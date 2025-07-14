import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'customer_plans'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('customer_id').references('id').inTable('customers').notNullable()
      table.integer('plan_id').references('id').inTable('plans').notNullable()
      table.integer('day_due').notNullable().defaultTo(1)
      table.date('start_date').notNullable()
      table.date('end_date').notNullable()
      table.integer('price').notNullable()
      table.integer('duration').notNullable()
      table.enum('duration_type', ['days', 'months', 'years']).notNullable().defaultTo('months')
      table.boolean('is_active').notNullable().defaultTo(true)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
