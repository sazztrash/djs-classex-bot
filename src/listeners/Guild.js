const { Listener } = require('../structures/Listener')
const { RequestHandler } = require('../handlers/index')
module.exports = class Guild extends Listener {
  constructor (client) {
    super(client, {
      events: [
        'guildCreate',
        'guildDelete'
      ]
    })
    this.client = client
    this.requestHandler = new RequestHandler(this.client)
  }

  async onGuildCreate (guild) {
    this.requestHandler.request('POST', '/create', { id: guild.id, active: {}, prefix: process.env.BOT_PREFIX })
  }

  async onGuildDelete (guild) {
    this.requestHandler.request('POST', '/delete', { id: guild.id })
  }
}
