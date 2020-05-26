const { Command } = require('../structures/Command')
const ms = require('ms')
const { RequestHandler } = require('../handlers/')
module.exports = class Ping extends Command {
  constructor (client) {
    super(client, {
      name: 'giveaway',
      aliases: [],
      requiredPermissions: 'MANAGE_GUILD',
      dev: false
    })
    this.client = client
    this.requestHandler = new RequestHandler(this.client)
  }

  async run ({ message, args }) {
    this.client.manager.start(message.channel, {
      time: ms(args[0]),
      prize: args.slice(2).join(' '),
      winnerCount: parseInt(args[1]),
      messages: {
        giveaway: '',
        giveawayEnded: '',
        timeRemaining: 'Time remaining: **{duration}**!',
        inviteToParticipate: 'React with 🎉 to participate!',
        winMessage: 'Congratulations, {winners}! You won **{prize}**!',
        embedFooter: 'Giveaways',
        noWinner: 'Giveaway cancelled, no valid participations.',
        hostedBy: 'Hosted by: {user}',
        winners: 'winner(s)',
        endedAt: 'Ended at',
        units: {
          seconds: 'seconds',
          minutes: 'minutes',
          hours: 'hours',
          days: 'days',
          pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
        }
      }
    }).then(async (gData) => {
      const messageID = gData.messageID
      console.log(messageID) // just for ignore the standardjs, oof
      const usersIn = []
      const createAndupdateArray = { id: gData.guildID, active: { messageID: usersIn } }
      const seeRequest = this.requestHandler.request('GET', `/see/${gData.guildID}`)
      if (!seeRequest.statusText === 'OK') {
        try {
          this.requestHandler.request('POST', '/create', createAndupdateArray).then(() => console.log('{CREATE} | Requested.'))
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          this.requestHandler.request('POST', '/update', createAndupdateArray).then(() => console.log('{UPDATE} | Requested.'))
        } catch (e) {
          console.log(e)
        }
      }
    })
  }
}
