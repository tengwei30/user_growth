const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
const packageJson = require(resolveApp('package.json'))

const envPublicUrl = process.env.PUBLIC_URL
const envPrefix = process.env.PREFIX

const getPublicUrl = appPackageJson =>
  envPublicUrl || packageJson.homepage

const getPrefix = appPackageJson =>
  envPrefix|| packageJson.prefix

module.exports = {
  appPath: resolveApp('.'),
  appPages: resolveApp('src/pages'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(packageJson),
  prefix: getPrefix(packageJson)
}
