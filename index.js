const { dotgiveaway } = require('./src/dotgiveaway')
require('dotenv').config()
console.log('Starting.')
const client = new dotgiveaway(process.env.DISCORD_TOKEN, {
  prefix: process.env.BOT_PREFIX
})
