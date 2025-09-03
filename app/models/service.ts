import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { randomUUID } from 'crypto'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Server from './server.js'
import ServicesVersion from './services_version.js'

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
  declare domain: string

  @column()
  declare publicKey: string

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

  @beforeCreate()
  public static async generatePublicKey(service: Service) {
    service.publicKey = randomUUID()
  }

  @belongsTo(() => Server)
  declare server: BelongsTo<typeof Server>

  @hasMany(() => ServicesVersion)
  declare versions: HasMany<typeof ServicesVersion>
}
