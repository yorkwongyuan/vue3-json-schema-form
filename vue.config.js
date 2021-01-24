const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
module.exports = {
  chainWebpack(config) {
    console.log(process.env.TYPE, 'HE???')
    if (process.env.TYPE !== 'lib') {
      config.plugin('monaco').use(new MonacoEditorWebpackPlugin())
    }
    config.plugin('circular').use(new CircularDependencyPlugin())
  },
}
