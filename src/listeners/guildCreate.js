const { RequestHandler } = require('../handlers/index')
module.exports = class GuildCreate {
  constructor (client) {
    this.client = client
    this.requestHandler = new RequestHandler(this.client)
  }

  async run (guild) {
    this.requestHandler.request('POST', '/create', { id: guild.id, active: {}, prefix: process.env.BOT_PREFIX })
  }
}
