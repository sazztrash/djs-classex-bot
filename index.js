const { dotgiveaway } = require('./src/dotgiveaway')
const Sentry = require('@sentry/node');
require('dotenv').config()
Sentry.init({ dsn: process.env.SENTRY_DSN });
console.log('Starting.')
const client = new dotgiveaway(process.env.DISCORD_TOKEN, {
  prefix: process.env.BOT_PREFIX
})
