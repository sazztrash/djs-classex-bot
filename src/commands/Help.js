const { Command } = require('../structures/Command')
const { MessageEmbed } = require('discord.js')

module.exports = class Help extends Command {
  constructor (client) {
    super(client, {
      name: 'help',
      aliases: [],
      requiredPermissions: null,
      dev: false
    })
  }

  async run ({ message }) {
    const helpEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Help')
      .setDescription('Are you interested in my simple commands? Hmm...')
      .addFields(
        { name: 'Start a Giveaway', value: '``make giveaway start <duration> <winners> <title>``', inline: true },
        { name: 'Re-Roll a Giveaway', value: '``make giveaway reroll <message id>``', inline: true },
        { name: 'Force End a Giveaway', value: '``make giveaway end <message id>``', inline: true },
        { name: 'Dashboard', value: '``make dashboard``', inline: true }
      )
      .setFooter('https://github.com/dot-giveaway/.giveaway')

    message.channel.send(helpEmbed)
  }
}
