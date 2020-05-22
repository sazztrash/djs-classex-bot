const { Command } = require('../structures/Command')
const ms = require('ms')
const { TimerHandler } = require('../handlers/')
const Messages = require('../util/Messages')

module.exports = class Giveaway extends Command {
  constructor (client) {
    super(client, {
      name: 'giveaway',
      aliases: null,
      requiredPermissions: null,
      dev: true
    })
    this.timerHandler = new TimerHandler()
  }

  async run ({ message, args }) {
   const duration = args[0]
   const winnerCount = args[1]
   const title = args.slice(2).join(' ')
   let users = []
   
   const format = await this.timerHandler.get(ms(duration))
   console.log(format)
   const embedMessage = await this.client.createMessage(message.channel.id, {
     embed: {
       title: title,
       footer: {
         text: `${winnerCount} winner(s)`
       },
       description: `${Messages.invite}\n${format}`,
       color: 0x008000,
       timestamp: this.timerHandler.count(ms(duration))
     }
   })
   message.channel.addMessageReaction(embedMessage.id, '🎉')
   setTimeout(async () => {
     const reactions = await message.channel.getMessageReaction(embedMessage.id, '🎉')
     reactions.forEach(user => {
       if(user.bot) return
       users.push(user)
     });
     const winner = await users[Math.floor(Math.random() * users.length)]
     this.client.createMessage(message.channel.id, Messages.winnerMessage.replace('{winners}', `<@${winner.id}>`).replace('{prize}', title))
     
     
   }, ms(duration));
  }
}
