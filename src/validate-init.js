import Vue from 'vue'
import install, * as vfv from './vue-final-validate'

const config = install(Vue)
Object.assign(config.rules, {
  required: {
    type: 'required',
    handler: (value, params) => params[0],
    message: 'The :name field is required.',
  },
  email: {
    handler(value) {
      return /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/.test(value)
    },
    message: 'The :name must be a valid email address.',
  },
})
