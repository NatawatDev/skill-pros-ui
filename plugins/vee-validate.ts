import { defineNuxtPlugin } from '#app'
import { defineRule, configure, Field, Form, ErrorMessage } from 'vee-validate'
import { required, email, min, max } from '@vee-validate/rules'

import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'

export default defineNuxtPlugin(nuxtApp => {
  defineRule('required', required)
  defineRule('email', email)
  defineRule('min', min)
  defineRule('max', max)

  configure({
    generateMessage: localize({ en }),
  })

  nuxtApp.vueApp.component('VField', Field)
  nuxtApp.vueApp.component('VForm', Form)
  nuxtApp.vueApp.component('ErrorMessage', ErrorMessage)
})
