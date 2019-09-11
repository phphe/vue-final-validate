# Built-in Rules
* accepted
* alpha
* alphaDash
* alphaNum
* between
* different
* email
* in
* integer
* length
* lengthBetween
* max
* maxLength
* min
* minLength
* notIn
* numeric
* regex
* required
* requiredIfField: required if related field not empty
* requiredIf: required if given function return true
* same
## Usage example
```js
form: {
  email: {required: true, email: true},
  email2: {requiredIfField: field => field.$parent.email},
  email3: {requiredIf: field => field.$parent.email.endsWith('outlook.com')},
  email4: {same: field => field.$parent.email},
  age: {between: [10, 20]},
},
```
