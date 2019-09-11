# Validation
## One Level
```js
data: {
  email: null,
  password: null,
},
form: {
  email: {required: true, email: true},
  password: {required: true, lengthBetween: [8, 16]},
}
```
## Multi-level
```js
data: {
  email: null,
  password: null,
  address: {
    city: null,
    street: null,
  }
},
form: {
  email: {required: true, email: true},
  password: {required: true, lengthBetween: [8, 16]},
  address: {
    $isParent: true,
    city: {required: true},
    street: {required: true},
  },
}
```
## Array
```js
data: {
  email: null,
  password: null,
  photos: [
    {
      name: null,
      date: null,
    },
    {
      name: null,
      date: null,
    },
  ],
},
form: {
  email: {required: true, email: true},
  password: {required: true, lengthBetween: [8, 16]},
  photos: {
    $isParent: true,
    '0': {
      $isParent: true,
      name: {required: true},
      date: {required: true},
    },
    '1': {
      $isParent: true,
      name: {required: true},
      date: {required: true},
    },
  },
}
```
In this example, you need code for each array item. Refer [$each](#each) to code just once.

## Set rules for parent
```js
data: {
  photos: [
    {
      name: null,
      date: null,
    },
    {
      name: null,
      date: null,
    },
  ],
},
form: {
  photos: {
    $isParent: true,
    $rules: {length: 2}, // here
    '0': {
      $isParent: true,
      name: {required: true},
      date: {required: true},
    },
    '1': {
      $isParent: true,
      name: {required: true},
      date: {required: true},
    },
  },
}
```
## $ignoreIf
Ignore self and children when validate. field.$ignore will be auto updated.
* type: {Function}
* Arguments:
  * [VueFinalValidateField](/api.html#vuefinalvalidatefield) field
## $each
```js
data: {
  photos: [
    {
      name: null,
      date: null,
    },
    {
      name: null,
      date: null,
    },
  ],
},
form: {
  photos: {
    $isParent: true,
    $rules: {length: 2},
    $each: (value, indexOrKey, count, field) => {
      return {
        $isParent: true,
        name: {required: true},
        date: {required: true},
      }
    },
  },
}
```
Don't use $each and key together.
## Initialized Validation
after `$vm0.$validate(this.form, this.data)`, `this.form` will become [VueFinalValidateField](/api.html#vuefinalvalidatefield)
