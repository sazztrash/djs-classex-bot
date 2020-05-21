const { Command } = require('../structures/Command')

module.exports = class Giveaway extends Command {
  constructor (client) {
    super(client, {
      name: 'giveaway',
      aliases: null,
      requiredPermissions: 'manageGuild',
      dev: false
    })
    this.client = client
  }
  async run({ message, args }) {
   // soon
  }
  }
