const { RequestHandler } = require('../handlers/index')
module.exports = class GuildDelete {
  constructor (client) {
    this.client = client
    this.requestHandler = new RequestHandler(this.client)
  }

  async run (guild) {
    this.requestHandler.request('POST', '/delete', { id: guild.id })
  }
}
