const { Command } = require('../structures/Command')

module.exports = class Ping extends Command {
  constructor (client) {
    super(client, {
      name: 'ping',
      aliases: null,
      requiredPermissions: null,
      dev: true
    })
  }

  async run ({ message, args }) {
    this.client.createMessage(message.channel.id, 'Pong!')
    const owo = await message.channel.getMessageReaction('712893057816854618', '🎉')
    console.log(owo)
  }
}
