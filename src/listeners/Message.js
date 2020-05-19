const { Listener } = require('../structures/Listener')
module.exports = class Message extends Listener {
  constructor (client) {
  	super(client, {
  	events: [
        'messageCreate'
      ]
  	})
  }

  async onMessageCreate (message) {
    if (message.author.bot) return
  	if (!message.content.startsWith(this.client.prefix)) return
  	const args = message.content.slice(this.client.prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
  	const fancyCommand = this.client.commands.get(command)
  	const requiredPermissions = fancyCommand.requiredPermissions

  	if (fancyCommand.dev == true) {
  		if (message.author.id !== process.env.BOT_OWNER_ID) {
  			return this.client.createMessage(message.channel.id, 'You do not have the required permissions to use this command.')
  		}
  	}
  	 if (requiredPermissions !== null) {
      if (!message.member.permission.has(requiredPermissions)) {
        return this.client.createMessage(message.channel.id, 'You do not have the required permissions to use this command.')
      }
    }
  	  try {
      new Promise((res, rej) => {
        res(fancyCommand.run({ message, args }))
        console.log('Command Run')
      })
    } catch (e) {
      console.log('Message Error')
    }
  }
}
