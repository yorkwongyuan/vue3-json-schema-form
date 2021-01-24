const Ajv = require('ajv')
const lad = require('ajv-i18n')
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      errorMessage: {
        type: '最小长度必须大于10',
        minLength: '不得小于10'
      },
      minLength: 10
    },
    age: {
      type: 'number',
      maxLength: 1,
      errorMessage: {
        type: 'hehe',
        minLength: '太短了'
      }
    }
  },
  required: ['name']
}

const ajv = new Ajv({ jsonPointers: true, allErrors: true })

require('ajv-errors')(ajv)
const validate = ajv.compile(schema)

const valid = validate({
  age: 19,
  name: 'york'
})

if (!valid) {
  lad.zh(validate.errors)
  console.log(validate.errors)
}