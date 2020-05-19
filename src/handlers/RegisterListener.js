const Boss = require('../structures/Boss')
const Listener = require('../structures/Listener')

module.exports = class RegisterListener extends Boss {
  constructor (client) {
  	super()
    this.listeners = []
    this.client = client
  }

  // https://github.com/SwitchbladeBot/switchblade-next/blob/master/src/loaders/ListenerLoader.js
  getListeners () {
  	return this.call('src/listeners', true)
  }

  loadFile (NewListener) {
    const listener = new NewListener(this.client)
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
    listener.events.forEach(event => {
      this.client.on(event, (...e) => listener['on' + capitalize(event)](...e))
    })

    return true
  }
}
