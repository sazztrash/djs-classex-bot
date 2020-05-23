const { Client, Collection } = require('discord.js')
const { readdir } = require('fs')

module.exports.DotGiveaway = class DotGiveaway extends Client {
  constructor (token, options) {
    super(token, options)
    this.token = token
    this.prefix = options.prefix
    this.commands = new Collection()
  }

  async start () {
    await this.loadCommands()
      .then(() => console.log('Loaded Commands.'))
    await this.loadListeners()
      .then(() => console.log('Loaded Listeners.'))
    await this.login(this.token)
      .then(() => console.log('Logged.'))
  }

  loadCommands () {
    readdir(`${__dirname}/commands`, (err) => {
      if (err) console.error(err)
      readdir(`${__dirname}/commands/`, (err, cmd) => {
        if (err) return console.log(err)
        cmd.forEach(cmd => {
          const command = new (require(`${__dirname}/commands/${cmd}`))(this)
          command.dir = `./src/commands/${cmd}`
          this.commands.set(command.name, command)
          command.aliases.forEach(a => this.aliases.set(a, command.name))
        })
      })
    })
  }

  loadListeners () {
    readdir(`${__dirname}/listeners`, (err, files) => {
      if (err) console.error(err)
      files.forEach(em => {
        const Event = require(`${__dirname}/listeners/${em}`)
        const eventa = new Event(this)
        super.on(em.split('.')[0], (...args) => eventa.run(...args))
      })
    })
  }
}
