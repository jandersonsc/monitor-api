import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Service from './service.js'

export default class Log extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare customerId: number

  @column()
  declare serviceId: number

  @column()
  declare type: string

  @column()
  declare message: string

  @column()
  declare level: 'info' | 'warning' | 'error' | 'success'

  @column()
  declare request: string

  @column()
  declare data: string

  @column()
  declare duration: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Service)
  declare service: BelongsTo<typeof Service>
}
