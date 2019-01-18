import * as hp from 'helper-js'
import * as treeHelper from 'tree-helper'

const cls = class VueFinalValidateField {
  // static -------------
  // str to name
  static generateName(str) {
    return hp.titleCase(str).toLocaleLowerCase()
  }
  static generateTitle(str) {
    return hp.titleCase(str)
  }
  static isEmpty(value) {
    if (value == null) {
      // null or undefined
      return true
    } else if (value.length != null) {
      // string or array
      return (value.trim ? value.trim() : value).length === 0
    }
  }
  static cloneValue(value) {
    if (hp.isArray(value) || hp.isObject(value)) {
      return JSON.parse(JSON.stringify(value))
    } else {
      return value
    }
  }
  static compareValue(value1, value2) {
    if (hp.isArray(value1) || hp.isObject(value1)) {
      return JSON.stringify(value1) === JSON.stringify(value2)
    } else {
      return value1 === value2
    }
  }
  static findParent(field, handler) {
    let current = field
    while (current) {
      if (handler(current)) {
        return current
      }
      current = current.$parent
    }
  }

  // handler(item, i, parent)
  //   return false // break loop
  //   return 'skip children' // skip children
  //   return 'skip siblings' // skip siblings
  static traverseField(field, handler) {
    treeHelper.depthFirstSearch(field, handler, '$children')
  }
  static watchAsync(vm, getter, handler, opt) {
    let destroies = []
    let destroyMain
    let value0, oldValue0
    main()
    return destroy
    function destroyExecs() {
      destroies.forEach(f => f())
      destroies = []
    }
    function destroy() {
      if (destroyMain) {
        destroyMain()
        destroyMain = null
      }
      destroyExecs()
    }
    function exec(getter) {
      let value
      let first = true
      const unwatch = vm.$watch(() => getter.call(vm, exec), value2 => {
        value = value2
        if (first) {
          first = false
        } else {
          main()
        }
      }, {immediate: true})
      destroies.push(unwatch)
      return value
    }
    function main() {
      let count = 0
      if (destroyMain) {
        destroyMain()
        destroyMain = null
      }
      destroyMain = vm.$watch(() => {
        destroyExecs()
        return getter.call(vm, exec)
      }, async (result) => {
        const localCount = count
        count++
        oldValue0 = value0
        value0 = await result
        if (localCount === 0) {
          if (opt && opt.immediate) {
            handler.call(vm, value0, oldValue0)
          }
        } else {
          handler.call(vm, value0, oldValue0)
        }
      }, {immediate: true})
    }
  }
  // props --------------
  // $parent,
  // $key,
  $type = 'object'
  // $root,
  // $name
  // $title,
  $empty = null
  $required = null
  $dirty = null
  $valid = null // false when validating.
  $validating = null
  $inputting = false
  // $inputtingDuration
  $errors = [] // [{field, ruleName, message}, ...]
  $value = null
  $default = null //Not recommended to write. The initial value will be set as default if no default
  $changed = false // value not equal to default
  // $getValue({value, field, fields}), // call when use fields.getData
  // $setValue({value, field, fields}), // call when use fields.setData
  /*
  $rules = {
    required: true,
    min: 10,
    min: {
      params: [10],
      message: 'The minimum :name is :params[0].',
    },
  },
  */
  _rules = {}
  _rulesForRequired = []
  _rulesForValid = []
  // $vm,
  $children = []
  constructor(vm, field, parent, key, root) {
    this.$vm = vm
    this.$parent = parent
    this.$key = key
    Object.assign(this, field)
    this.$type = hp.isArray(field) ? 'array' : 'object'
    this.$root = root || field
    if (this.$name == null) {
      this.$name = cls.generateName(key)
    }
    if (this.$title == null) {
      this.$title = cls.generateTitle(this.$name)
    }
    this.$children = this._resolveChildren(field)
    this.$setDefalt(this.$value)
  }
  _resolveChildren(field) {
    if (hp.isArray(field)) {
      return field.map((childFieldInfo, index) => new cls(this.$vm, childFieldInfo, field, index, this.fields))
    } else {
      const children = []
      for (const key in field) {
        const head = key.substr(0, 1)
        if (head === '_' || head === '$') {
          continue
        }
        if (!hp.isArray(field[key]) && !hp.isObject(field[key])) {
          continue
        }
        const childFieldInfo = field[key]
        const childField = new cls(this.$vm, childFieldInfo, field, key, this.fields)
        field[key] = childField
        children.push(childField)
      }
      return children
    }
  }
  $add(field, keyOrIndex, index) {
    field = new cls(this.$vm, field, this, key || index, this.fields)
    if (this.$type === 'object') {
      this.$vm.$set(this, keyOrIndex, field)
    } else {
      index = keyOrIndex
    }
    if (index == null) {
      this.$children.push(field)
    } else {
      this.$children.splice(index, 0, field)
    }
    if (this.$obStatus === 'started') {
      field.start()
    }
    return this
  }
  $delete(keyOrIndex) {
    const field = this[keyOrIndex] || this.$children[keyOrIndex]
    if (this.$obStatus === 'started') {
      field.stop()
    }
    hp.arrayRemove(this.$children, field)
    if (this.$type === 'object') {
      this.$vm.$delete(this, keyOrIndex)
    }
    return this
  }
  $setDefalt(value) {
    this.$default = cls.cloneValue(value)
  }
  $obStatus = 'stopped' // observer status: started, stopped
  _watchForRules() {
    this._unwatchRules = this.$vm.$watch(() => {
      if (!this.$rules) {
        return
      }
      const rulesForRequired = []
      const rulesForValid = []
      const rules = {}
      for (const name in this.$rules) {
        let ruleInfo = this.$rules[name]
        if (!hp.isObject(ruleInfo)) {
          ruleInfo = {
            params: hp.isArray(ruleInfo) ? ruleInfo : [ruleInfo],
          }
        }
        const wrappedRule = {
          name,
          params: ruleInfo.params,
          type: ruleInfo.hasOwnProperty('type') ? ruleInfo.type : 'valid',
          handler: () => {
            const ruleHandler = cls.findParent(
              this,
              field => field.$rules && field.$rules[name] && field.$rules[name].handler
            )
            if (!ruleHandler) {
              throw new Error(`No handler found for rule '${name}' in field ${this.$name}.`)
            }
            const wrappedError = (e) => {
              const errorMessage = cls.findParent(this, field => field.hasOwnProperty('$errorMessage'))
              return {valid: false, error: e, message: errorMessage}
            }
            try {
              const ruleHandlerReturn = ruleHandler(
                this.$value,
                ruleInfo.params,
                {field: this, root: this.$root},
              )
              if (hp.isPromise(ruleHandlerReturn)) {
                return ruleHandlerReturn.catch((e) => wrappedError(e))
              } else {
                return ruleHandlerReturn
              }
            } catch (e) {
              return wrappedError(e)
            }
          },
          message: async (ruleHandlerReturn) => {
            // convert message to str from str, function, null
            const resolveMessage = async (message) => {
              if (hp.isFunction(message)) {
                message = await message(
                  this.$value,
                  ruleInfo.params,
                  {field: this, root: this.$root, ruleHandlerReturn}
                )
              }
              return message
            }
            //
            let messageTpl
            if (ruleHandlerReturn && ruleHandlerReturn.message) {
              // get message from ruleHandlerReturn
              messageTpl = await resolveMessage(ruleHandlerReturn.message)
            } else {
              // get message from parent
              cls.findParent(this, field => {
                let msg = field.$rules && field.$rules[name] && field.$rules[name].hasOwnProperty('message')
                messageTpl = await resolveMessage(msg)
                return msg
              })
            }
            if (!messageTpl) {
              // get message from parent defaultMessage
              messageTpl = cls.findParent(this, field => field.hasOwnProperty('$defaultMessage'))
              messageTpl = await resolveMessage(msg)
            }
            // compile message
            let message = messageTpl.replace(/:name/g, this.$name)
            .replace(/:value/g, this.$value)
            if (ruleInfo.params) {
              for (let i = 0; i < ruleInfo.params.length; i++) {
                const param = ruleInfo.params[i]
                const reg = new RegExp(':params\\[' + i + '\\]', 'g')
                message = message.replace(reg, param)
              }
            }
            return message
          },
        }
        if (wrappedRule.type === 'required') {
          rulesForRequired.push(wrappedRule)
        } else {
          rulesForValid.push(wrappedRule)
        }
        rules[name] = wrappedRule
      }
      return {required: rulesForRequired, valid: rulesForValid, rules}
    }, (result) => {
      if (!result) {
        this._rules = {}
        this._rulesForRequired = []
        this._rulesForValid = []
      } else {
        this._rules = result.rules
        this._rulesForRequired = result.required
        this._rulesForValid = result.valid
      }
    }, {immediate: true})
  }
  _watchForDirty() {
    this._unwatchDirty = this.$vm.$watch(
      () => this.$children.length ? this.$children.map(c => c.$dirty) : this.$value,
      () => {
        if (this.$children.length === 0) {
          this.$dirty = true
        } else {
          this.$dirty = this.$children.find(c => c.$dirty)
        }
      },
      {deep: true}
    )
  }
  _watchForParentFieldValid() {
    // for parent field only
    this._unwatchParentFieldValid = this.$vm.$watch(
      () => this.$children.map(c => c.$valid && c.$validating),
      () => {
        if (this.$children.length > 0) {
          this.$valid = this.$children.every(c => c.$valid)
          this.$validating = Boolean(this.$children.find(c => c.$validating))
        }
      }
    )
  }
  _watchForParentFieldValue() {
    // prevent parent first execution
    if (this._unwatchParentFieldValue) {
      return
    }
    // for parent field only
    // child first
    this.$children.forEach(childField => childField._watchForParentFieldValue())
    this._unwatchParentFieldValue = this.$vm.$watch(
      () => [this.$children.map(c => c.$value), this.$nullable, this.$changed],
      () => {
        if (this.$children.length > 0) {
          let data
          if (this.$type === 'object') {
            data = {}
            this.$children.forEach(childField => {
              data[childField.$key] = childField.$value
            })
          } else {
            data = this.$children.map(childField => childField.$value)
          }
          if (this.$nullable) {
            if (!this.$changed) {
              data = null
            }
          }
          this.$value = data
        }
      },
      {immediate: true, deep: true},
    )
  }
  _watchForChanged() {
    this._unwatchChanged = this.$vm.$watch(
      () => this.$children.length ? this.$children.map(c => c.$changed) : this.$value,
      () => {
        if (this.$children.length > 0) {
          this.$changed = Boolean(this.$children.find(c => c.$changed))
        } else {
          this.$changed = cls.compareValue(this.$value, this.$default)
        }
      },
      {deep: true}
    )
  }
  _watchForValidate() {
    this._unwatchValidate = this.$vm.$watch(() => {
      if (!this.$rules) {
        return {valid: true}
      }
      // required
      let required
      const parent = this.$parent
      const required = field._rules.required && field._rules.required.handler()
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
            if (required) {
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
    }, () => {
      if (!valueUpdated) {
        valueUpdated = true
      } else {
        this.$dirty = true
      }
    }, {immediate: true, deep: true})
  }
  $start() {
    if (this.$obStatus === 'started') {
      return
    }
    // todo 什么时候执行child.start
    // children start
    this.$children.forEach(childField => {
      childField.$start()
    })
    // watch rules and generate _rules
    this._watchForRules()
    // watch and auto update `$dirty`
    this._watchForDirty()
    // watch and auto update `$valid`, `$validating` of parent field
    this._watchForParentFieldValid()
    //
    this._watchForParentFieldValue()
    //
    this._watchForChanged()
    // watch and auto update `$required`, `$valid`, `$validating`
    this._watchForValidate()
    this.$obStatus = 'started'
  }
  $stop() {}
  $getData() {
    if (this.$children.length === 0) {
      return this.$getValue ? this.$getValue({
        value: this.$value,
        field: this,
        root: this.$root,
      }) : this.$value
    }
    if (this.$type === 'object') {
      const data = {}
      this.$children.forEach(childField => {
        data[childField.$key] = childField.$getData()
      })
      return data
    } else {
      return this.$children.map(childField => childField.$getData())
    }
  }
  $setData(data) {}
  $setDirty(dirty) {
    if (this.$children.length === 0) {
      this.$dirty = dirty
    } else {
      this.$children.forEach(childField => {
        childField.$setDirty(dirty)
      })
    }
    return this
  }
}

export VueFinalValidateField

export function makeMountPoint() {
  const mountPointVm = new Vue({
    data() {
      return {
        mountPoint: {},
      }
    }
  })
  return mountPointVm.mountPoint
}

export function getDefaultConfig() {
  return {
    $defaultMessage: 'The :name is invalid.',
    $errorMessage: 'System error during verification.',
    $rules: {},
    $bail: true // Stop running validation rules after the first validation failure.,
    $inputtingDuration: 1000,
  }
}

export function makeGlobal(config) {
  const cfg = getDefaultConfig()
  if (config) {
    config = Object.assign(cfg, config)
  }
  cfg.$isGlobal = true
  return cfg
}

export function makeValidateMethod(mountPoint, theGlobal) {
  return function (fields) {
    fields = new VueFinalValidateField(this, fields, theGlobal)
    if (!mountPoint[this._uid]) {
      this.$set(mountPoint, this._uid, [])
    }
    mountPoint[this._uid].push(fields)
    fields.$start()
    return fields
  }
}

export default {
  install(Vue, config) {
    const name = config.name || 'validate'
    const cfg = {}
    if (config) {
      Object.keys(config).forEach(key => {
        if (key !== 'name') {
          cfg[`$${key}`] = config[key]
        }
      })
    }
    const root = makeGlobal(cfg)
    const mountPoint = makeMountPoint()
    Vue.prototype[`$${name}`] = makeValidateMethod(mountPoint, root)
  }
}

// =============================================================================

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

class VueFinalValidateField {
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
              params: hp.isArray(ruleInfo) ? ruleInfo : [ruleInfo],
            }
          }
          const wrappedRule = {
            name,
            params: ruleInfo.params,
            willDecideRequired: has(ruleInfo, 'willDecideRequired') ? ruleInfo.willDecideRequired : this.rules[name].willDecideRequired,
            handler: () => {
              let ruleHandler = ruleInfo.handler || this.rules[name].handler
              if (!ruleHandler) {
                throw new Error(`No handler found for rule '${name}'.`)
              }
              return ruleHandler(field.$value, ruleInfo.params, field, validation)
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
                message = message(field.$value, validateResult, ruleInfo.params, field, validation)
              }
              if (!message) {
                message = this.defaultMessage
              }
              message = message.replace(/:name/g, field.$name).replace(/:value/g, field.$value)
              if (ruleInfo.params) {
                for (let i = 0; i < ruleInfo.params.length; i++) {
                  const param = ruleInfo.params[i]
                  const reg = new RegExp(':params\\[' + i + '\\]', 'g')
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

export default VueFinalValidateField

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
      required(value, params, field, validation) {
        // the context is the current vm
        // return bool
        // return a obj with additional info(validate result will be passed to message): {$valid: bool, ...}
        // return promise
      },
      required: {
        willDecideRequired: true,
        params: [true],
        handler: (value, params, field, validation) => value,
        message: 'The :name is required.',
      },
      min: 10,
      min: {
        params: [10],
        handler(value, params, field, validation), {
          return value < params[0]
        },
        message: 'The :name is required.',
        message: 'The :name must be at least :params[0].',
        message(value, validateResult, params, field, validation), {
          return `The ${field.$name} must be at least ${params[0]}.`
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
