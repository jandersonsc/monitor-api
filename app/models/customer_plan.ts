import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class CustomerPlan extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare customerId: number

  @column()
  declare planId: number

  @column()
  declare startDate: DateTime

  @column()
  declare endDate: DateTime

  @column()
  declare price: number

  @column()
  declare duration: number

  @column()
  declare durationType: 'days' | 'months' | 'years'

  @column()
  declare dayDue: number

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
