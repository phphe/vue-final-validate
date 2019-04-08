// use bili to build lib
// vue-cli 3 support build as library, but don't support output as es module because of webpack
const bili = require('bili');
const fs = require('fs');

bili.write({
  input: './src/vue-final-validate.js',
  format: ['cjs','umd','umd-min','es'],
  banner: true,
  plugin: [],
}).then(() => {
  console.log('vue-final-validate.js done!')
})
bili.write({
  input: './src/messages/en.js',
  name: 'en',
  moduleName : 'VueFinalValidateMessagesEn',
  outDir: './dist/messages',
  format: ['cjs','umd','umd-min','es'],
  banner: true,
  plugin: [],
}).then(() => {
  console.log('messages/en.js done!')
})
bili.write({
  input: './src/messages/zh-CN.js',
  name: 'zhCN',
  moduleName : 'VueFinalValidateMessagesZhCN',
  outDir: './dist/messages',
  format: ['cjs','umd','umd-min','es'],
  banner: true,
  plugin: [],
}).then(() => {
  console.log('messages/zh-CN.js done!')
})
