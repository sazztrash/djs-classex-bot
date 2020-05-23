const { Command } = require('../structures/Command')
const Messages = require('../util/Messages')
const ms = require('ms')

module.exports = class Ping extends Command {
  constructor (client) {
    super(client, {
      name: 'giveaway',
      aliases: [],
      requiredPermissions: 'MANAGE_GUILD',
      dev: false
    })

    this.client = client
  }

  async run ({ message, args }) {
    this.client.manager.start(message.channel, {
        time: ms(args[0]),
        prize: args.slice(2).join(" "),
        winnerCount: parseInt(args[1]),
        messages: {
            giveaway: "",
            giveawayEnded: "",
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: "React with 🎉 to participate!",
            winMessage: "Congratulations, {winners}! You won **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway cancelled, no valid participations.",
            hostedBy: "Hosted by: {user}",
            winners: "winner(s)",
            endedAt: "Ended at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    }).then((gData) => {
        console.log(gData); // {...} (messageid, end date and more)
    });
  }
}
