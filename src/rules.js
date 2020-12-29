import * as hp from 'helper-js'

const rules = {
  accepted(value) {
    return value === 'yes' || value === 'on' || value === true || value === 1 || value === '1'
  },
  alpha(value) {
    return /^[a-zA-Z]+$/.test(value)
  },
  alphaDash(value) {
    return /^[\w-]+$/.test(value)
  },
  alphaNum(value) {
    return /^[\w]+$/.test(value)
  },
  between(value, params) {
    return params[0] <= value && params[1] <= value
  },
  different(value, params) {
    const relatedField = hp.isFunction(params[0]) ? params[0](field) : params[0]
    return value !== relatedField.$value
  },
  email(value) {
    // from https://regexlib.com/Search.aspx?k=email
    return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(value)
  },
  in(value, params) {
    return params[0].indexOf(value) > -1
  },
  integer(value) {
    return hp.isNumeric(value) && !value.toString().includes('.')
  },
  length(value, params) {
    return (value || '').length === params[0]
  },
  lengthBetween(value, params) {
    const len = (value || '').length
    return (params[0] <= len && len <= params[1])
  },
  max(value, params) {
    return value <= params[0]
  },
  maxLength(value, params) {
    return (value || '').length <= params[0]
  },
  min(value, params) {
    return value >= params[0]
  },
  minLength(value, params) {
    return (value || '').length >= params[0]
  },
  notIn(value, params) {
    return params[0].indexOf(value) === -1
  },
  numeric(value) {
    return hp.isNumeric(value)
  },
  regex(value, params) {
    const reg = hp.isString(params[0]) ? new RegExp(params[0]) : params[0]
    return reg.test(value)
  },
  required: {
    type: 'required',
    handler: (value, params) => params[0],
  },
  // require if related field not empty
  requiredIfField: {
    type: 'required',
    handler: (value, params, field) => {
      const relatedField = hp.isFunction(params[0]) ? params[0](field) : params[0]
      return {__validate: !relatedField.$empty, value: relatedField}
    },
  },
  // required if getter return true
  requiredIf: {
    type: 'required',
    handler: (value, params, field) => {
      return params[0](field)
    },
  },
  same(value, params, field) {
    const relatedField = params[0](field)
    return {__validate: value === relatedField.$value, value: relatedField}
  },
}
export default rules
