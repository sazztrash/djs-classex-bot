const Boss = require('../structures/Boss')
module.exports = class RegisterCommand extends Boss {
  constructor (client) {
    super()
    this.client = client
  }

  getCommands () {
    return this.call('src/commands', true)
  }

  loadFile (NewCommand) {
    const command = new NewCommand(this.client)
    this.client.commands.set(command.name, command)
    return true
  }
}
