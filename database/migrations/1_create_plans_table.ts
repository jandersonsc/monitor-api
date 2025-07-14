import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'plans'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('description')
      table.integer('price').notNullable()
      table.integer('duration').notNullable().defaultTo(1)
      table.enum('duration_type', ['days', 'months', 'years']).notNullable().defaultTo('months')
      table.boolean('is_active').notNullable().defaultTo(false)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
