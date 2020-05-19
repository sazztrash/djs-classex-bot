const { FileUtils } = require('../util/Files')
module.exports = class Boss {
  constructor (client) {
    this.client = client
    this.name = this.constructor.name
  }

  // https://github.com/SwitchbladeBot/switchblade-next/blob/master/src/structures/Loader.js
  async preCall () {
  	 try {
      const success = await this.load()
      if (!success) throw new Error('Unhandled error')
      return success
    } catch (e) {
      console.log(`Failed to load ${this.name}`)
      return false
    }
  }

  async call (path, recursive = false) {
    if (!path || typeof path !== 'string') throw new TypeError(`The 'path' argument on '${this.constructor.name}.loadFiles()' must be a string. Received ${typeof path} instead.`)
    let success = 0
    let fails = 0
    const errorFunction = e => {
      console.error(e.stack || e)
      fails++
    }
    const successFunction = (file, fileName) => {
      try {
        if (this.loadFile(file)) {
          console.log(`Loaded ${fileName}`)
          success++
        } else {
          console.error(`Failed to load ${fileName}`)
          throw new Error(`'${this.constructor.name}.loadFile()' returned an unhandled error.`)
        }
      } catch (e) {
        errorFunction(e)
      }
    }
    await FileUtils.requireDirectory(path, successFunction, errorFunction, recursive).then(() => {
      if (fails) console.warn(`${success} types of ${this.name} loaded, ${fails} failed.`, { label: 'Loader' })
      else console.log(`All ${success} types of ${this.name} loaded without errors.`)
    })
    return true
  }

  loadFile (file) {
    throw new Error(`The ${this.name} loader has not implemented the loadFile() function`)
  }

  async load () {
  	return true
  }
}
