const packageInfo = require('./package.json')

module.exports = {
  output: {
    moduleName: packageInfo.name,
    fileName: ({format}, template) => {
      if (format === 'cjs') {
        template = template.replace('[name]', '[name].[format]')
      } else if (format === 'umd') {
        template = template.replace('.[format]', '')
      }
      return template.replace('[name]', packageInfo.name)
    },
  }
}
