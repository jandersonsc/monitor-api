import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Service from './service.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Environment from './environment.js'
import Server from './server.js'
import Customer from './customer.js'

export default class ServicesVersion extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare customerId: number

  @column()
  declare serviceId: number

  @column()
  declare serverId: number

  @column()
  declare environmentId: number

  @column()
  declare version: string

  @column()
  declare description: string

  @column()
  declare status: 'pending' | 'progress' | 'success' | 'failed'

  @column.dateTime()
  declare completedAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>

  @belongsTo(() => Service)
  declare service: BelongsTo<typeof Service>

  @belongsTo(() => Server)
  declare server: BelongsTo<typeof Server>

  @belongsTo(() => Environment)
  declare environment: BelongsTo<typeof Environment>
}
