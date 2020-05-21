const { Command } = require('../structures/Command')

module.exports = class Giveaway extends Command {
  constructor (client) {
    super(client, {
      name: 'giveaway',
      aliases: null,
      requiredPermissions: 'manageGuild',
      dev: false
    })
  }
  
  async run({ message, args }) {
  let title = args.slice(0).join(" ")
  let time = args.slice(1).join(" ")
  if(!title.startsWith("title")) return this.client.createMessage(message.channel.id, 'You did not specify the title.')
  // if(!time.startsWith("duration")) return this.client.createMessage(message.channel.id, 'You did not specify the duration.')
  let formatedTitle = title.replace("title ", "")
  let formatedTime = time.replace("duration ", "")
  // plz help me
  formatedTime = formatedTime.replace(formatedTitle, "")
  formatedTime = formatedTime.replace(args[1], "")
  formatedTitle = formatedTitle.replace(formatedTime, "")
  formatedTitle = formatedTitle.replace("duration", "")
  if(!formatedTime.endsWith("h") && !formatedTime.endsWith("m")) return this.client.createMessage(message.channel.id, 'This does not seem like a valid duration! Remember, we only accept durations in hours or minutes (example: 1h, 1m)')
  const embedMessage = await this.client.createMessage(message.channel.id, {
    embed: {
      title: formatedTitle,
      description: `Ends in ${formatedTime}`,
      author: { 
        name: message.author.username,
        icon_url: message.author.avatarURL
    },
   footer: { 
      text: "Created with .giveaway"
  }
    }
  })
  await this.client.addMessageReaction(message.channel.id, embedMessage.id, '🎉')
  setInterval(() => {
    console.log(embedMessage.reactions)
  }, 60000);
}
}