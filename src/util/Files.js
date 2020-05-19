const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
// https://github.com/SwitchbladeBot/switchblade-next/blob/master/src/utils/FileUtils.js
module.exports.FileUtils = class FileUtils {
  static async requireDirectory (dirPath, success, error, recursive = true) {
    const files = await promisify(fs.readdir)(dirPath)
    const filesObject = {}
    return Promise.all(files.map(async fileName => {
      const fullPath = path.resolve(dirPath, fileName)
      if (fileName.match(/\.(js|json)$/)) {
        try {
          const required = require(fullPath)
          if (success) await success(required, fileName)
          filesObject[fileName] = required
          return required
        } catch (e) {
          error(e, fileName)
        }
      } else if (recursive) {
        const isDirectory = await FileUtils.stat(fullPath).then(f => f.isDirectory())
        if (isDirectory) {
          return FileUtils.requireDirectory(fullPath, success, error)
        }
      }
    })).then(() => filesObject).catch(console.error)
  }
}

module.exports.readFile = promisify(fs.readFile)
module.exports.stat = promisify(fs.stat)
