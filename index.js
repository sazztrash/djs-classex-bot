const { DotGiveaway } = require('./src/dotgiveaway')
const Sentry = require('@sentry/node')
require('dotenv').config()
// owo
Sentry.init({ dsn: process.env.SENTRY_DSN })
console.log('Starting.')
const client = new DotGiveaway(process.env.DISCORD_TOKEN, {
  prefix: process.env.BOT_PREFIX
})
client.start()
