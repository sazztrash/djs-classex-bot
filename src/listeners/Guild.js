const { Listener } = require('../structures/Listener')
const { RequestHandler } = require('../handlers/index')
module.exports = class Guild extends Listener {
    constructor(client) {
        super(client, {
            events: [
                'guildCreate'
            ]
        })
        this.client = client
        this.requestHandler = new RequestHandler(this.client)
    }
    async onGuildCreate(guild) {
        const res = this.requestHandler.request('POST', '/create', { id: guild.id, active: {}})
        console.log(res.data) // just for test things.
    }
}