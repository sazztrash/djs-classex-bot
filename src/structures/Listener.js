module.exports.Listener = class Listener {
  constructor (client, options) {
    this.client = client
    this.events = options.events || null
  }

  // https://github.com/SwitchbladeBot/switchblade-next/blob/master/src/structures/Listener.js
}
