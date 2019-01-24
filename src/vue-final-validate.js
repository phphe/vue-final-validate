import * as hp from 'helper-js'

export class VueFinalValidateField {
  // static -------------
  static DEFAULT = '__DEFAULT__'
  // str to name
  static generateName(str) {
    return hp.snakeCase(str).replace(/_/g, ' ')
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
  static findParent(field, handler) {
    let current = field
    while (current) {
      if (handler(current)) {
        return current
      }
      current = current.$parent
    }
  }
  static watchAsync(vm, getter, handler, opt) {
    let destroies = []
    let destroyMain
    let value0, oldValue0
    let count = -1 // updated count
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
    function exec(getter, opt) {
      let value
      let first = true
      const unwatch = vm.$watch(() => getter.call(vm, exec), value2 => {
        value = value2
        if (first) {
          first = false
        } else {
          main()
        }
      }, {immediate: true, deep: opt && opt.deep})
      destroies.push(unwatch)
      return value
    }
    function main() {
      if (destroyMain) {
        destroyMain()
        destroyMain = null
      }
      destroyMain = vm.$watch(() => {
        destroyExecs()
        return getter.call(vm, exec)
      }, async (result) => {
        count++
        const localCount = count
        oldValue0 = value0
        value0 = await result
        if (localCount !== count) {
          // expired
          return
        }
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
  // do handler first, handler return getter
  static doWatch(vm, handler) {
    let oldValue, unwatch
    const update = () => {
      const getter = handler.call(vm, oldValue)
      unwatch = vm.$watch(getter, (value) => {
        unwatch()
        oldValue = value
        update()
      })
    }
    update()
    return () => unwatch && unwatch()
  }
  // props --------------
  // $vm,
  // $globalConfig,
  // $parent,
  // $key,
  // $validation,
  // $name
  $isParent = null
  $empty = null
  $required = null
  $dirty = null
  $valid = null // false when validating.
  $validating = null
  $inputting = false
  _dirty = null
  _valid = null // false when validating.
  _validating = null
  _inputting = false
  _ignore = null
  $ignore = null
  $ignoreIf = null
  _errors = [] // [{field, ruleName, message}, ...] // for end field only
  $value = null
  $deep = null
  // $valueGetter(field), // how to get self value
  // $childValueGetter(field), // how to get child value
  $default = cls.DEFAULT
  /*
  // start not with $ or _
  // or include rules in $rules. if $rules existed, rest is child fields
  required: true,
  min: 10,
  min: {
    params: [10],
    message: 'The minimum :name is :params[0].',
  },
  */
  _rules = {}
  _rulesForRequired = []
  _rulesForValid = []
  //
  $children = null
  $each = null // Function(value, indexOrKey, count, field)
  constructor(vm, field, config, parent, key, validation) {
    this.$vm = vm
    this.$globalConfig = config
    this.$parent = parent
    this.$key = key
    Object.assign(this, field)
    if (key && this.$name == null) {
      this.$name = cls.generateName(key)
    }
    this.$validation = validation
    // if no validation, assign methods and props of the validation instance to the inital validation object
    if (!validation) {
      validation = field
      this.$validation = validation
      for (const key in this) {
        if (validation[key] !== this[key]) {
          this.$vm.$set(validation, key, this[key])
        }
      }
      for (const key of Object.getOwnPropertyNames(cls.prototype)) {
        if (key === 'constructor') {
          continue
        }
        if (validation[key] !== cls.prototype[key]) {
          this.$vm.$set(validation, key, cls.prototype[key])
        }
      }
    }
  }
  // base start ======================
  _baseStart() {
    // watch to generate validation structure
    // watch and make _rules, _rulesForRequired, _rulesForValid
    this._watchForRules()
    // watch and make $value, $empty
    this._watchForValue()
    // watch and make $children, _collectedRules
    this._updateChildren()
    this._watchForEach()
    // after children generated
    //
    this._watchForStatus()
  }
  _baseUnwatches = []
  _baseUnwatch() {
    this._baseUnwatches.forEach(f => f())
    this._baseUnwatches = []
    if (this.$children) {
      Object.values(this.$children).forEach(c => c._baseUnwatch())
    }
  }
  // base watch ===============
  _watchForEach() {
    const unwatch = this.$vm.$watch(() => {
      if (this.$each) {
        // with $each, mainly for array
        const children = {}
        if (this.$value) {
          let count = 0
          hp.forAll(this.$value, (value, indexOrKey) => {
            const childField = this.$each(value, indexOrKey, count, this)
            children[indexOrKey] = childField
            count++
          })
        }
        return children
      }
    }, (children, old) => {
      if (old) {
        let needDelete
        if (children) {
          const newKeys = Object.keys(children)
          needDelete = Object.keys(old).filter(key => !newKeys.includes(key))
        } else {
          needDelete = Object.keys(old)
        }
        needDelete.forEach(key => {
          this.$delete(key)
        })
      }
      if (children) {
        Object.keys(children).forEach(key => {
          if (old && old[key]) {
            Object.assign(this[key], children[key])
            children[key] = this[key]
          } else {
            children[key] = new cls(this.$vm, children[key], this.$globalConfig, this, key, this.$validation)
            children[key]._notBaseStarted = true
            this.$vm.$set(this, key, children[key])
          }
        })
        this.$children = Object.keys(children).length > 0 ? children : null
        Object.values(children).forEach(c => {
          if (c._notBaseStarted) {
            c._baseStart()
          }
        })
        if (this.$validation.$started) {
          Object.values(children).forEach(c => {
            if (!c.$started) {
              c.start()
            }
          })
        }
      } else {
        this.$children = null
      }
    }, {immediate: true})
    this._baseUnwatches.push(unwatch)
  }
  _updateChildren() {
    if (this.$each) {
      this.$isParent = true
    } else if (this.$isParent || this === this.$validation || this.$rules) {
      // is parent
      // validation or with `$rules`
      this.$isParent = true
      for (const {key, value} of iterateObjectWithoutDollarDash(this)) {
        this.$add(key, value)
      }
    } else {
      this.$isParent = false
    }
  }
  _watchForValue() {
    const unwatch = this.$vm.$watch(() => {
      let value
      if (this.$valueGetter) {
        value = this.$valueGetter(this)
      } else {
        let t = cls.findParent(this, field => field.$childValueGetter)
        const childValueGetter = t ? t.$childValueGetter : this.$globalConfig.childValueGetter
        if (childValueGetter) {
          value = childValueGetter(this)
        } else {
          if (this === this.$validation) {
            value = this.$vm.$data // must use vm.$data; use `vm` will get error `Maximum call stack size exceeded`
          } else {
            value = this.$parent.$value && this.$parent.$value[this.$key]
          }
        }
      }
      return value
    }, (value) => {
      this.$value = value
      this.$empty = cls.isEmpty(value)
    }, {immediate: true})
    this._baseUnwatches.push(unwatch)
  }
  _watchForRules() {
    let ii = 0
    const unwatch = cls.watchAsync(this.$vm, async (exec) => {
      ii++
      if (ii > 100) {
        throw 'loop'
      }
      const rulesForRequired = []
      const rulesForValid = []
      let rules
      if (this.$each || this.$rules || this === this.$validation) {
        rules = this.$rules
        if (hp.isFunction(rules)) {
          rules = rules(this)
        } else if (rules) {
          // clone
          rules = Object.assign({}, rules)
        } else {
          rules = {}
        }
      } else {
        // end field
        rules = {}
        await hp.waitTime(0) // wait 1 millisecond to make getter async
        for (const {key, value} of iterateObjectWithoutDollarDash(this)) {
          exec(() => this[key])
          rules[key] = value
        }
      }
      return exec(() => {
        for (const name in rules) {
          let ruleInfo = rules[name]
          if (!hp.isObject(ruleInfo)) {
            ruleInfo = {
              params: hp.isArray(ruleInfo) ? ruleInfo : [ruleInfo],
            }
          }
          // resolve type
          let type = 'valid'
          if (ruleInfo.hasOwnProperty('type')) {
            type = ruleInfo.type
          } else if (this.$globalConfig.rules[name]) {
            type = this.$globalConfig.rules[name].type
          }
          const wrappedRule = {
            name,
            params: ruleInfo.params,
            type,
            handler: (exec) => {
              const ruleHandler = ruleInfo.handler || (this.$globalConfig.rules[name] && this.$globalConfig.rules[name].handler)
              if (!ruleHandler) {
                const e = new Error(`No handler found for rule '${name}' in field ${this.$name}.`)
                e.name = 'no_handler'
                throw e
              }
              const onSystemError = (e) => {
                console.warn(`System error when validate field '${this.$name}' rule '${name}'.`, e)
                const systemErrorMessage = this.$globalConfig.systemErrorMessage
                return {__validate: false, error: e, message: systemErrorMessage}
              }
              try {
                const ruleReturn = ruleHandler(
                  this.$value,
                  ruleInfo.params,
                  this,
                  exec,
                )
                if (hp.isPromise(ruleReturn)) {
                  return ruleReturn.catch((e) => onSystemError(e))
                } else {
                  return ruleReturn
                }
              } catch (e) {
                return onSystemError(e)
              }
            },
            message: async (ruleReturn) => {
              // convert message to str from str, function, null
              const resolveMessage = async (message) => {
                if (hp.isFunction(message)) {
                  message = await message(
                    this.$value,
                    ruleInfo.params,
                    this,
                    ruleReturn,
                  )
                }
                return message
              }
              //
              // get message from config
              let messageTpl = ruleInfo.message || (this.$globalConfig.rules[name] && this.$globalConfig.rules[name].message)
              if (!messageTpl) {
                // get message from parent defaultMessage
                messageTpl = this.$globalConfig.defaultMessage
              }
              // compile message
              messageTpl = await resolveMessage(messageTpl)
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
      })
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
    this._baseUnwatches.push(unwatch)
  }
  // start =====================
  _unwatches = []
  $started = false
  $start() {
    if (this.$started) {
      return
    }
    if (this.$children) {
      Object.values(this.$children).forEach(childField => {
        childField.$start()
      })
    }
    this._watchForStatus()
    this._watchForValidate()
    this.$started = true
  }
  $stop() {
    this._unwatches.forEach(f => f())
    this._unwatches = []
    Object.values(this.$children).forEach(c => c.$stop())
    this.$started = false
  }
  // advanced watch ===============
  // watch and auto update `dirty`, `inputting`, `valid`, `validating`, `ignore`
  _watchForStatus() {
    let unwatch
    // computed status: $dirty, $inputting, $valid, $validating, $ignore
    unwatch = this.$vm.$watch(
      () => this._dirty || (this.$children && Object.values(this.$children).find(c => c.$dirty)),
      (value) => {
        this.$dirty = Boolean(value)
      },
      {immediate: true}
    )
    this._unwatches.push(unwatch)
    unwatch = this.$vm.$watch(
      () => this._inputting || (this.$children && Object.values(this.$children).find(c => c.$inputting)),
      (value) => {
        this.$inputting = Boolean(value)
      },
      {immediate: true}
    )
    this._unwatches.push(unwatch)
    unwatch = this.$vm.$watch(
      () => this._validating || (this.$children && Object.values(this.$children).find(c => c.$validating)),
      (value) => {
        this.$validating = Boolean(value)
      },
      {immediate: true}
    )
    this._unwatches.push(unwatch)
    unwatch = this.$vm.$watch(
      () => this.$ignoreIf && this.$ignoreIf(this),
      (value) => {
        this._ignore = Boolean(value)
      },
      {immediate: true}
    )
    this._unwatches.push(unwatch)
    unwatch = this.$vm.$watch(
      () => {
        if (cls.findParent(this, field => field._ignore)) {
          return true
        }
        return this._ignore
      },
      (value) => {
        this.$ignore = Boolean(value)
      },
      {immediate: true}
    )
    this._unwatches.push(unwatch)
    // self status: _dirty _inputting
    unwatch = this.$vm.$watch(
      () => this.$value,
      () => {
        if (cls._lastUserInputAt) {
          const nowTime = new Date().getTime()
          if (nowTime - cls._lastUserInputAt < 100) {
            const setDirty = () => {
              this._inputtingTimer = null
              this._inputting = false
              this._dirty = true
              if (this.$started) {
                if (this.$default !== cls.DEFAULT && this.$value === this.$default) {
                  // equal $default
                  this._dirty = false
                }
              }
            }
            if (!this.$globalConfig.inputtingDuration) {
              setDirty()
            } else {
              this._inputting = true
              if (this._inputtingTimer) {
                clearTimeout(this._inputtingTimer)
                this._inputtingTimer = null
              }
              this._inputtingTimer = setTimeout(setDirty, this.$globalConfig.inputtingDuration)
            }
          }
        }
      },
      {immediate: true, deep: this.$deep}
    )
    this._unwatches.push(unwatch)
  }
  // watch and auto update `$required`, `_valid`, `_validating`, `_errors`
  _watchForValidate() {
    let validateId = -1
    const unwatch = cls.watchAsync(this.$vm, async (exec) => {
      validateId++
      const id = validateId
      const rules = this._rules
      const rulesRequired = this._rulesForRequired
      const rulesValid = this._rulesForValid
      let required = false
      let valid = true
      const reasons = []
      exec(() => this.$inputting)
      if (this.$inputting) {
        return {inputting: true}
      }
      // observe $value
      exec(() => this.$value, {deep: this.$deep})
      this._validating = true
      // check required
      for (let i = 0; i < rulesRequired.length; i++) {
        const rule = rulesRequired[i]
        exec(() => rule.handler)
        let t = rule.handler(exec)
        if (hp.isPromise(t) && this.$globalConfig.timeout) {
          t = promiseTimeout(t, this.$globalConfig.timeout)
        }
        let ruleReturn = await t
        if (id !== validateId) {
          return {expired: true}
        }
        if (ruleReturn.hasOwnProperty('__validate')) {
          required = ruleReturn.__validate
          ruleReturn = ruleReturn.value
        } else {
          required = Boolean(ruleReturn)
        }
        if (i === rulesRequired.length - 1) {
          // last rule
          exec(() => this.$empty)
          if (required && this.$empty) {
            valid = false
            reasons.push({ruleReturn, rule})
            exec(() => this.$globalConfig.bail)
            if (this.$globalConfig.bail) {
              return {required, valid, reasons, id}
            }
          }
        }
      }
      exec(() => this._dirty)
      if (!this._dirty) {
        // stop validate if not dirty
        return {required, valid, reasons, id}
      }
      // check valid
      for (const rule of rulesValid) {
        exec(() => rule.handler)
        let t = rule.handler(exec)
        if (hp.isPromise(t) && this.$globalConfig.timeout) {
          t = promiseTimeout(t, this.$globalConfig.timeout)
        }
        let ruleReturn = await t
        if (id !== validateId) {
          return {expired: true}
        }
        if (ruleReturn.hasOwnProperty('__validate')) {
          valid = ruleReturn.__validate
          ruleReturn = ruleReturn.value
        } else {
          valid = Boolean(ruleReturn)
        }
        if (!valid) {
          reasons.push({ruleReturn, rule})
          exec(() => this.$globalConfig.bail)
          if (this.$globalConfig.bail) {
            return {required, valid, reasons, id}
          }
        }
      }
      //
      return {required, valid, reasons, id}
    }, async (value, old) => {
      if (value.inputting || value.expired) {
        return
      }
      this.$required = value.required
      this._valid = value.valid
      const errors = []
      for (const {ruleReturn, rule} of value.reasons) {
        const message = await rule.message(ruleReturn)
        if (value.id !== validateId) {
          return
        }
        errors.push({field: this, ruleName: rule.name, message})
      }
      this._errors = errors
      this._validating = false
    }, {immediate: true})
    this._unwatches.push(unwatch)
  }
  // methods about errors ==================
  $getErrors() {
    if (this.$children) {
      const r = []
      Object.values(this.$children).forEach(c => {
        r.push(...c.$getErrors())
      })
      return r
    } else {
      return this._errors
    }
  }
  $getFirstError() {
    if (this.$children) {
      for (const c of Object.values(this.$children)) {
        const r = c.$getFirstError()
        if (r) {
          return r
        }
      }
    } else {
      return this._errors[0]
    }
  }
  // don't use add, delete with $each
  $add(key, field) {
    field = new cls(this.$vm, field, this.$globalConfig, this, key, this.$validation)
    this.$vm.$set(this, key, field)
    if (!this.$children) {
      this.$children = {}
    }
    this.$vm.$set(this.$children, key, field)
    field._baseStart()
    if (this.$started) {
      field.$start()
    }
    return this
  }
  $delete(keyOrIndex) {
    const field = this[keyOrIndex]
    field._destroy()
    this.$vm.$delete(this, keyOrIndex)
    this.$vm.$delete(this.$children, keyOrIndex)
    return this
  }
  _destroy() {
    this._baseUnwatch()
    this.$stop()
  }
  $setStatus(name, value) {
    this[`_${name}`] = value
    if (this.$children) {
      Object.values(this.$children).forEach(c => c.$setStatus(name, value))
    }
    return this
  }
  $setDirty(dirty) {
    return this.$setStatus('dirty', dirty)
  }
  $trySubmit() {
    this.$setDirty(true)
    this.$setStatus('inputting', false)
    return new Promise((resolve, reject) => {
      const unwatch = this.$vm.$watch(() => this.$validating, (validating) => {
        // use setTimeout to delay immediate watch, else unwatch is not ready
        setTimeout(() => {
          if (!validating) {
            unwatch()
            if (this.$valid) {
              resolve(this)
            } else {
              const e = new Error('Invalid input.')
              e.name = 'invalid'
              reject(e)
            }
          }
        }, 0)
      }, {immediate: true})
    })
  }
}
export const cls = VueFinalValidateField

export function makeMountPoint(Vue) {
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
    defaultMessage: 'The :name is invalid.',
    systemErrorMessage: 'System error during verification.',
    rules: {},
    bail: true, // Stop running validation rules after the first validation failure.,
    inputtingDuration: 1000,
    timeout: 5000, // validate timeout, for async validate
    methodName: 'validate',
    // childValueGetter(filed)
  }
}

export function makeValidateMethod(mountPoint, config) {
  Object.assign(initValidation, config)
  return initValidation
  function initValidation(validation, data) {
    if (data && !validation.hasOwnProperty('$valueGetter')) {
      validation.$valueGetter = () => data
    }
    new VueFinalValidateField(this, validation, initValidation)
    if (!mountPoint[this._uid]) {
      this.$set(mountPoint, this._uid, [])
    }
    mountPoint[this._uid].push(validation)
    validation._baseStart()
    validation.$start()
    return validation
  }
}

// listen user input events
export function listenUserInput() {
  if (cls._listenUserInput) {
    return
  }
  cls._listenUserInput = true
  const handler = () => {
    cls._lastUserInputAt = new Date().getTime()
  }
  hp.onDOM(window, 'keydown', handler)
  hp.onDOM(window, 'mousedown', handler)
}

export default function install(Vue, config) {
  listenUserInput()
  const cfg = getDefaultConfig()
  if (config) {
    Object.assign(cfg, config)
  }
  config = cfg
  const name = config.methodName
  const mountPoint = makeMountPoint(Vue)
  const validateMethod = Vue.prototype[`$${name}`] = makeValidateMethod(mountPoint, cfg)
  Vue.mixin({
    beforeDestroy() {
      // destroy validation of current vm
      if (mountPoint[this._uid]) {
        mountPoint[this._uid].forEach(validation => {
          validation._baseUnwatch()
        })
        this.$delete(mountPoint, this._uid)
      }
    }
  })
  return validateMethod
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
      const e = new Error('Promise timeout!')
      e.name = 'timeout'
      reject(e)
    }, timeout)
  })
}

function* iterateObjectWithoutDollarDash(obj) {
  for (const key in obj) {
    const start = key.substr(0, 1)
    if (start !== '$' && start !== '_') {
      yield {key, value: obj[key]}
    }
  }
}
