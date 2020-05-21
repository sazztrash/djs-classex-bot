const axios = require('axios')
const ENDPOINTS = require('../util/Endpoints')
module.exports = class RequestHandler {
  constructor (client) {
    this.client = client
  }

  async request (method, endpoint, data) {
    if (!method) return console.log('Method not Specified.')
    if (!endpoint) return console.log('Endpoint not Specified.')
    let response
    switch (endpoint) {
      case ENDPOINTS.CREATE:
        if (!data) return console.log('Data not Specified.')
        response = await axios({
          method: method,
          url: `${ENDPOINTS.BASE_URL}${ENDPOINTS.CREATE}`,
          data: {
            botToken: process.env.DISCORD_TOKEN,
            id: data.id,
            active: data.active,
            prefix: data.prefix
          }
        })
        break
      case ENDPOINTS.SEE:
        response = await axios({
          method: method,
          url: `${ENDPOINTS.BASE_URL}${ENDPOINTS.SEE}`
        })
        break
      case ENDPOINTS.UPDATE:
        if (!data) return console.log('Data not Specified.')
        response = await axios({
          method: method,
          url: `${ENDPOINTS.BASE_URL}${ENDPOINTS.UPDATE}`,
          data: {
            botToken: process.env.DISCORD_TOKEN,
            id: data.id,
            active: data.active,
            prefix: data.prefix
          }
        })
        break
      case ENDPOINTS.DELETE:
        if (!data) return console.log('Data not Specified.')
        response = await axios({
          method: method,
          url: `${ENDPOINTS.BASE_URL}${ENDPOINTS.DELETE}`,
          data: {
            botToken: process.env.DISCORD_TOKEN,
            id: data.id
          }
        })
        break
    }
    return response
  }
}
