/**
*
* @param {string}  globPath  文件的路径
* @returns entries
*/
const path = require('path')
const glob = require('glob')

// const filePrefix = require('../config').build.filePrefix

module.exports = function (globPath) {
  let entries = {}, basename, tmp, pathname, folderName

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry))
    tmp = entry.split('/').splice(-2) // 页面文件夹名字
    folderName = tmp.splice(0, 1)
    pathname = folderName
    // entries[filePrefix + pathname] = entry
    entries[pathname] = entry
  })

  return entries
}


