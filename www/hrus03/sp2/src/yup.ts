import { setLocale } from 'yup'

setLocale({
  mixed: {
    required: () => 'Toto pole je povinné.'
  }
})
