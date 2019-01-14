import * as hp from 'helper-js'

// todo
/*
1. promise
2. required
3. error component
4. 验证时生成message
 */
const utils = {
  isEmpty,
  eachField,
  getFieldValue,
  setFieldValue,
  iterateChildFields,
  generateName,
  generateTitle,bails
}
const ut = utils

class VueFinalValidate {
  defaultMessage = 'The :name is invalid.'
  systemErrorMessage = 'System error during verification'
  defaultLocale = 'en'
  locale = 'en'
  rules = {}
  bail = true // Stop running validation rules after the first validation failure.
  initValidation(vm, validation, fields) {
    const defaultValidation = {
      fields: fields,
      dirty: false,
      valid: false,
      validating: false,
      vm,
      vueFinalValidate: this,
      getData() {
        const validation = this
        return recursive(this.fields, true)
        function recursive(field, isRoot) {
          if (isRoot || field.$isParent) {
            if (hp.isArray(field)) {
              return field.map((childField, index) => recursive(childField))
            } else {
              // object
              const r = {}
              for (const {key, childField} of ut.iterateChildFields(field)) {
                r[key] = recursive(childField)
              }
              return r
            }
          } else {
            return ut.getFieldValue(field, validation)
          }
        }
      },
      async getDataIfValid(timeout = 500) {
        if (this.validating) {
          if (!this._waitValidating) {
            this._waitValidating = new Promise((resolve, reject) => {
              this._waitValidatingResolve = resolve
            })
          }
          await promiseTimeout(this._waitValidating, timeout).catch(() => {
            throw new Error('validating')
          })
        }
        if (!this.valid) {
          throw new Error('invalid')
        }
        return this.getData()
      },
      setData(data) {
        const validation = this
        recursive(this.fields, data, true)
        return this
        function recursive(field, data, isRoot) {
          if (isRoot || field.$isParent) {
            if (data) {
              for (const {key, childField} of ut.iterateChildFields(field)) {
                if (data.hasOwnProperty(key)) {
                  recursive(childField, data[key])
                }
              }
            }
            // no data to set
          } else {
            ut.setFieldValue(field, data, validation)
          }
        }
      },
      setDirty(to) {
        this.dirty = to
        ut.eachField(this.fields, (field, key, parent) => {
          field.$dirty = to
        })
        return this
      },
      start() {
        ut.eachField(this.fields, (field, key, parent) => {
          field._watch.start()
        })
      },
      stop() {
        ut.eachField(this.fields, (field, key, parent) => {
          field._watch.stop()
        })
      },
    }
    for (const key in defaultValidation) {
      vm.$set(validation, key, defaultValidation[key])
    }
    //
    ut.eachField(validation.fields, (field, key, parent) => {
      this.initField(vm, field, key, parent, validation)
    })
    return validation
  }
  initField(vm, field, key, parent, validation) {
    vm.$set(field, '$key', key)
    if (!field.$name) vm.$set(field, '$name', ut.generateName(key))
    if (!field.$title) vm.$set(field, '$title', ut.generateTitle(field.$name))
    vm.$set(field, '$required', false)
    // attach states to field
    vm.$set(field, '$dirty', false)
    vm.$set(field, '$valid', false)
    vm.$set(field, '$validating', false)
    vm.$set(field, '$errors', [])
    if (!has(field, '$value')) vm.$set(field, '$value', null)
    // add _rules and auto update it
    if (!has(field, '_rules')) {
      vm.$set(field, '_rules', {})
      vm.$watch(() => {
        if (!field.$rules) {
          return
        }
        const rulesForRequired = [] // willDecideRequired
        const rulesForValid = []
        for (const name in field.$rules) {
          let ruleInfo = field.$rules[name]
          if (!hp.isObject(ruleInfo)) {
            ruleInfo = {
              parameters: hp.isArray(ruleInfo) ? ruleInfo : [ruleInfo],
            }
          }
          const wrappedRule = {
            name,
            parameters: ruleInfo.parameters,
            willDecideRequired: has(ruleInfo, 'willDecideRequired') ? ruleInfo.willDecideRequired : this.rules[name].willDecideRequired,
            handler: () => {
              let ruleHandler = ruleInfo.handler || this.rules[name].handler
              if (!ruleHandler) {
                throw new Error(`No handler found for rule '${name}'.`)
              }
              return ruleHandler(field.$value, ruleInfo.parameters, field, validation)
            },
            message: (validateResult) => {
              let message = ruleInfo.message
              if (hp.isObject(message)) {
                message = message[this.locale] || message[this.defaultLocale]
              }
              if (!message) {
                message = this.rules[name] && this.rules[name].message
                if (hp.isObject(message)) {
                  message = message[this.locale] || message[this.defaultLocale]
                }
              }
              if (hp.isFunction(message)) {
                message = message(field.$value, validateResult, ruleInfo.parameters, field, validation)
              }
              if (!message) {
                message = this.defaultMessage
              }
              message = message.replace(/:name/g, field.$name).replace(/:value/g, field.$value)
              if (ruleInfo.parameters) {
                for (let i = 0; i < ruleInfo.parameters.length; i++) {
                  const param = ruleInfo.parameters[i]
                  const reg = new RegExp(':parameters\\[' + i + '\\]', 'g')
                  message = message.replace(reg, param)
                }
              }
              return message
            },
          }
          if (wrappedRule.willDecideRequired) {
            rulesForRequired.push(wrappedRule)
          } else {
            rulesForValid.push(wrappedRule)
          }
        }
        return {required: rulesForRequired, valid: rulesForValid}
      }, (rules) => {
        field._rules = rules
      }, {immediate: true})
    }
    // watch on valid
    let isFirst
    const watch = {
      isRequiredAndValid: () => {
        if (!field.$rules) {
          return {valid: true}
        }
        // required
        let isRequired // todo watch promise见底部
        const isRequired = field._rules.required && field._rules.required.handler()
        if (!field._rules.required && ut.isEmpty(field.$value)) {
          return {valid: true}
        } else {
          const required = field._rules.required.handler()
          // todo validate all
          let valid = true
          const errors = []
          for (const key in field._rules) {
            let ruleHandler = field._rules[key].handler
            if (key === 'required') {
              if (isRequired) {
                ruleHandler = () => !ut.isEmpty(field.$value)
              } else {
                ruleHandler = () => true
              }
            }
            valid = ruleHandler()
            if (!valid) {
              const message = field._rules[key].message()
              errors.push({key, message})
              break
            }
          }
          return {required, valid, errors}
        }
      },
      handler: (t) => {
        const dirty = !isFirst
        vm.$set(field, '$dirty', dirty)
        vm.$set(field, '$required', t.required)
        vm.$set(field, '$valid', t.valid)
        vm.$set(field, '$errors', t.errors)
        vm.$set(validation, '$dirty', dirty)
        if (!t.valid) {
          vm.$set(validation, '$valid', false)
          // todo add errors to validation
        } else {
          let allValid = true
          ut.eachField(validation.fields, (field) => {
            if (!field.$valid) {
              allValid = false
              return false
            }
          })
          vm.$set(validation, '$valid', allValid)
        }
      },
      start: () => {
        if (!watch._stop) {
          isFirst = true
          watch._stop = vm.$watch(watch.isRequiredAndValid, watch.handler, {immediate: true})
          isFirst = false
        }
        return watch._stop
      },
      stop: () => {
        if (watch._stop) {
          watch._stop()
          watch._stop = null
        }
      },
    }
    field._watch = watch
  }
  static utils = utils
}
function isEmpty(value) {
  if (value == null) {
    // null or undefined
    return true
  } else if (value.length != null) {
    // string or array
    return (value.trim ? value.trim() : value).length === 0
  }
}
function ut.eachField(fields, handler) {
  recursive(fields)
  function recursive(field, key, parent) {
    if (parent) {
      if (!field.$isParent) {
        return handler(field, key, parent)
      }
    }
    // field is a parent
    for (const {key, childField} of ut.iterateChildFields(field)) {
      if (recursive(childField, key, field) === false) {
        return false
      }
    }
  }
}
function ut.getFieldValue(field, validation) {
  return field.$getValue ? field.$getValue(
    field.$value, field, validation
  ) : field.$value
}
function ut.setFieldValue(field, value, validation) {
  if (field.$setValue) {
    return field.$setValue(value, field, validation)
  } else {
    field.$value = value
  }
}
function promiseTimeout(promise, timeout) {
  return new Promise((resolve, reject) => {
    let t, rejected
    promise.then((...args) => {
      clearTimeout(t)
      resolve(...args)
    }, (...args) => {
      if (!rejected) {
        clearTimeout(t)
        reject(...args)
      }
    })
    t = setTimeout(() => {
      rejected = true
      reject(new Error('Promise timeout.'))
    }, timeout)
  })
}
function* ut.iterateChildFields(field) {
  if (hp.isArray(field)) {
    for (let i = 0; i < field.length; i++) {
      const childField = field[i]
      yield {key: i, childField}
    }
  } else {
    for (const key in field) {
      const start = key.substr(0, 1)
      if (start !== '$' && start !== '_') {
        const childField = field[key]
        if (hp.isArray(childField) || hp.isObject(childField)) {
          yield {key, childField};
        }
      }
    }
  }
}

// str to name
function generateName(str) {
  return hp.titleCase(str).toLocaleLowerCase()
}
function generateTitle(str) {
  return hp.titleCase(str)
}

function has(obj, prop) {
  return obj.hasOwnProperty(prop)
}

export default VueFinalValidate

// api
/*
fields = {
  user: {
    $key,
    $name,
    $title,
    $required, // readonly
    $dirty, // Write is not recommended
    $valid, // false when validating. Write is not recommended
    $validating, // Write is not recommended
    // Write is not recommended
    $errors: [
      {key, message},
      ...
    ],
    $value,
    $getValue(value, field, validation), // call when use validation.getData
    $setValue(value, field, validation), // call when use validation.setData
    $rules: {
      required: true,
      required(value, parameters, field, validation) {
        // the context is the current vm
        // return bool
        // return a obj with additional info(validate result will be passed to message): {$valid: bool, ...}
        // return promise
      },
      required: {
        willDecideRequired: true,
        parameters: [true],
        handler: (value, parameters, field, validation) => value,
        message: 'The :name is required.',
      },
      min: 10,
      min: {
        parameters: [10],
        handler(value, parameters, field, validation), {
          return value < parameters[0]
        },
        message: 'The :name is required.',
        message: 'The :name must be at least :parameters[0].',
        message(value, validateResult, parameters, field, validation), {
          return `The ${field.$name} must be at least ${parameters[0]}.`
        },
        message: {
          zh: '中文消息',
          en: 'English message',
        },
      },
    },
    // nested children
    $isParent, // required if has children
    name: {
      $parent, // readonly
      $rules: {},
    },
  },
}
validation = {
  fields,
  dirty,
  valid, // false when validating
  validating,
  getData(),
  getDataIfValid(),
  setData(data),
  setDirty(to),
}
*/
function watchAsync(vm, getter, handler) {
  const newGetter = function (...args) {

    return getter.call(this, attach, ...args)
  }
  let destroies = []
  function destroyAll() {
    for (const func of destroies) {
      func()
    }
    destroies = []
  }
  function watchAndGetValue(getter, handler) {
    let value
    let first = true
    const destroy = vm.$watch(getter, (v, oldValue) => {
      value = v
      if (first) {
        first = false
      } else {
        handler.call(vm, v, oldValue)
      }
    }, {immediate: true})
    return [value, destroy]
  }
  function start() {
    vm.$watch(newGetter, (value, oldValue) => {
      value = v
      if (first) {
        first = false
      } else {
        destroy()
        start()
      }
    }, options)
  }
  function attach(getter) {
    let value
    let first = true
    const [value, destroy] = watchAndGetValue(getter, () => {
      destroyAll()
      start()
    })
    return value
  }
}
