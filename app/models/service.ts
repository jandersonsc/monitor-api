import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare customerId: number

  @column()
  declare serverId: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare protocol: string

  @column()
  declare port: number

  @column()
  declare status: 'running' | 'stopped' | 'error'

  @column()
  declare isPublic: boolean

  @column()
  declare isMonitoring: boolean

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
