import Service from '#models/service'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class ServicePing extends BaseCommand {
  static commandName = 'service:ping'
  static description = ''

  static options: CommandOptions = {}

  public static settings = {
    loadApp: true
  }

  async run() {
    this.logger.info('Hello world from "ServicePing"')
    const services = await this.getServices()
    this.logger.info(JSON.stringify(services))
  }

  private async getServices() {
    const services = await Service.query().select('id', 'name', 'domain', 'protocol', 'port').where('is_monitoring', true)
    this.logger.info(JSON.stringify(services))
    return services
  }
}