const { CommandClient, Collection } = require('eris')
const Boss = require('./structures/Boss')
const ListenerRegister = require('./util/RegisterListener')
const CommandRegister = require('./util/RegisterCommand')

module.exports.dotgiveaway = class dotgiveaway extends CommandClient {
  constructor (token, options, commandoptions) {
    super(token, options, commandoptions)
    this.token = token
    this.prefix = options.prefix
    this.commands = new Collection()
    this.start()
  }

  // https://github.com/SwitchbladeBot/switchblade-next/blob/master/src/structures/base/Switchblade.js
  start () {
    if (!this.token) return console.log('No Token Specified.')
    console.log('Connecting to the Discord...')
    const register = new ListenerRegister(this)
    const commander = new CommandRegister(this)
    register.getListeners()
    commander.getCommands()
    this.callBoss()
    this.connect()
    console.log('Connected.')
  }

  async callBoss () {
    const boss = new Boss(this)
    let success = false
    try {
      success = await boss.preCall()
      console.log('Success.')
    } catch (e) {
      console.log('BOSS HAVE ERROR!')
    } finally {
      if (!success) return process.exit(1)
    }
    console.log('The Boss is invoked.')
  }
}
