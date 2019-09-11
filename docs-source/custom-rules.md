# Custom Rules
## rule type
There are 2 types of rule now: `valid, required`. The default type is `valid`. `required` rule determines if a field required. Common `required` rule: required, requiredIf, requiredIfField
## add a custom rule
```js
VFVInstance.addRules({
  date(value, params, field, exec) {
    const valid = /^\d\d\d\d-\d\d-\d\d$/.test(value)
    return valid
    // return more info
    // the value will be passed to message function
    return {__validate: valid, value: 'more info'}
    // the return can be promise
  },
})
VFVInstance.addMessages({
  date: 'The :name is not a valid date',
  // function message
  date(value, params, field, ruleReturn) {
    'The :name is not a valid date'
  },
}, 'en')
```
