# Installation
## npm install
```sh
npm install vue-final-validate --save
```
## use npm
```js
import VFVInstall from 'vue-final-validate'
import VFV_EN from 'vue-final-validate/dist/messages/en.js'
// import VFV_zh_CN from 'vue-final-validate/dist/messages/zh-CN.js'

const VFVInstance = VFVInstall(Vue)
// const VFVInstance = VFVInstall(Vue, config)
VFVInstance.locale = 'en'
VFVInstance.addMessages(VFV_EN, 'en')
```
## use script
```html
<script type="text/javascript" src="path/dist/vue-final-validate.js"></script>
<script type="text/javascript" src="path/dist/messages/en.js"></script>
<!-- <script type="text/javascript" src="path/dist/messages/zh-CN.js"></script> -->
<script type="text/javascript">
const VFVInstance = vueFinalValidate.default(Vue)
// const VFVInstance = vueFinalValidate.install(config)
VFVInstance.locale = 'en'
VFVInstance.addMessages(VueFinalValidateMessagesEn, 'en')
// VFVInstance.addMessages(VueFinalValidateMessagesZhCN, 'zh-CN')
</script>
```
### define and init
```js
export default {
  data() {
    return {
      // define form data
      data: {
        email: null,
        password: null,
        password_confirmation: null,
      },
      // define validation info
      form: {
        email: {required: true, email: true},
        password: {required: true, minLength: 6},
        password_confirmation: {required: true, same: field => field.$parent.password},
      },
    }
  },
  created() {
    // init validation at any time.
    this.$validate(this.data, this.form)
  },
}
```
### set dirty and validate before submit
```js
async your_submit_method() {
  await this.form.$trySubmit()
  // do submit
}
```
### display required sign
```html
<span v-if="form.email.$required">*</span>
```
### display errors
First, create `FormError.vue` with follow code:
```vue
<template>
  <div class="form-error" v-if="!inputting && (validating || errors.length > 0)">
    <div class="form-error-items" v-if="validating">
      <div class="form-error-item form-error-item--validating">Checking...</div>
    </div>
    <div class="form-error-items" v-else="v-else">
      <div class="form-error-item" v-for="item in errors">{{item.message}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    field: {},
    fields: {},
  },
  // components: {},
  // data() {
  //   return {}
  // },
  computed: {
    fields2() { return this.field ? [this.field] : this.fields },
    inputting() { return Boolean(this.fields2.find(f => f.$inputting)) },
    validating() { return Boolean(this.fields2.find(f => f.$validating)) },
    visible() {
      const {fields2} = this
      return fields2 && fields2.find(field => field.$dirty && !field.$valid)
    },
    errors() {
      const {fields2} = this
      const errors = []
      fields2.forEach(field => {
        if (field.$started) {
          errors.push(...field.$getErrors().filter(({field}) => field.$dirty && !field.$validating && !field.$inputting && !field.$valid))
        }
      })
      return errors
    },
  },
  // watch: {},
  // methods: {},
  // created() {},
  // mounted() {},
}
</script>

<style>
.form-error{}
.form-error-items{
}
.form-error-item:first-child{
  margin-top: 5px;
}
.form-error-item{
  color: red;
  font-size: .9em;
}
.form-error-item--validating{
  color: blue;
}
</style>

```
Then:
```vue
<template>
  <FormError :field="form.email" />
</template>
```
