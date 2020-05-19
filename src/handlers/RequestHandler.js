const axios = require('axios')
const ENDPOINTS = require('../util/Endpoints')
module.exports = class RequestHandler {
    constructor(client) {
        this.client = client
    }

    async request(method, endpoint, data) {
        if(!method) return console.log('Method not Specified.')
        if(!endpoint) return console.log('Endpoint not Specified.')
        switch(endpoint) {
            case ENDPOINTS.CREATE:
                if(!data) return console.log('Data not Specified.')
                response = await axios({
                    method: method,
                    url: `${ENDPOINTS.BASE_URL}${ENDPOINTS.CREATE}`,
                    data: {
                        botToken: process.env.DISCORD_TOKEN,
                        id: data.id,
                        active: data.active
                    }
                })
                return response
            break;
            case ENDPOINTS.SEE:
                response = await axios({
                    method: method,
                    url: `${ENDPOINTS.BASE_URL}${ENDPOINTS.SEE}`
                })
                return response
            break;
            case ENDPOINTS.UPDATE:
                if(!data) return console.log('Data not Specified.')
                response = await axios({
                    method: method,
                    url: `${ENDPOINTS.BASE_URL}${ENDPOINTS.UPDATE}`,
                    data: {
                        botToken: process.env.DISCORD_TOKEN,
                        id: data.id,
                        active: data.active
                    }
                })
                return response
            break;
        }
    }
}