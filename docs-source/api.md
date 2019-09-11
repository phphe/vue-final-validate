# API
## VFVInstall(Vue, [config])
* Arguments:
  * Vue
  * {Object} [config]
    * defaultMessage: 'The :name is invalid.',
    * systemErrorMessage: 'System error during verification.',
    * bail: true, // Stop running validation rules after the first validation failure.,
    * inputtingDuration: 1000,
    * timeout: 5000, // validate timeout, for async validate
    * methodName: 'validate',
    * locale: 'en'
* Returns: VFVInstance
## VFVInstance
VFVInstance is the validate method. If the validate method name is `validate`(default), then VFVInstance is vm.$validate.   
The config is assigned to VFVInstance. You can change config on VFVInstance. e.g.: VFVInstance.locale = 'other language code'.
### validate method
`$vm.$validate(validation, data)`, the name can be customized.
* Arguments:
  * {Object} [validation](/validation.html)
  * {Object} data
### addRules(rules)
* Arguments:
  * {Object} rules
    * refer [rule](#rule)
### addMessages(messages, locale)
* Arguments:
  * {Object} messages
    * refer [message](#message)
  * {String} locale
## Rule
  * type: {Object | Function}
  * when it is Object
    * {String} type
      * available values: valid, required
    * {Function} handler
      * Arguments:
        * {any} value
        * {Array} params
        * {[VueFinalValidateField](#vuefinalvalidatefield)} field
        * {Function} exec
          * refer [Async Rules](/async-rules.html)
      * Returns: {Boolean | Object | Promise}
        * a rule can return a special object with additional info. The structure is `{__validate: 'if valid', value: 'additional info'}`. The additional info will be passed to message function.
  * when it is function   
If the rule is a function, then the function is rule handler, the rule type is `valid`.

## Message
  * type: {String | Function}
  * placeholders
    * `:name` field.$name
    * `:param[n]` params[n]
    * example: 'The `:name` length must be `:params[0]`.'
  * Arguments:
    * {any} value
    * {Array} params
    * {[VueFinalValidateField](#vuefinalvalidatefield)} field
    * {any} ruleReturn

## VueFinalValidateField
### Properties
#### $vm
#### $globalConfig
#### $parent
#### $key
#### $validation
the validation root
#### $name
the name in message
#### $isParent
#### $empty
#### $required
#### $dirty
self dirty or children dirty
#### $valid
self valid and children valid
#### $validating
self validating or children validating
#### $inputting
self inputting or children inputting
#### $ignoreIf
Refer [/validation.html#ignoreif](/validation.html#ignoreif)
#### $ignore
ignore self and children when validate
#### $value
#### $children
For loop children fields.
#### $each
Refer [/validation.html#each](/validation.html#each)
### functions
#### $start()
start to observe. it will auto start when use this.$validate(validation, data)
#### $stop()
#### $getErrors()
#### $getFirstError()
#### $add(key, field)
not work if $each existed
#### $delete(keyOrIndex)
not work if $each existed
#### $setDirty(dirty)
#### $trySubmit()
set all fields dirty, return promise, reject if invalid
