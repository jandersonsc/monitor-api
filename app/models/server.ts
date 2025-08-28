import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Environment from './environment.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Server extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare customerId: number

  @column()
  declare environmentId: number

  @column()
  declare name: string

  @column()
  declare host: string

  @column()
  declare description: string

  @column()
  declare key: string

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Environment)
  declare environment: BelongsTo<typeof Environment>
}
