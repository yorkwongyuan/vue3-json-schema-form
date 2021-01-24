const Ajv = require('ajv')
const localize = require('ajv-i18n')
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
    },
    pets: {
      type: 'array',
      items: [
        {
          type: 'string',
          maxLength: 2,
          errorMessage: {
            type: 'hehe',
            maxLength: '大便'
          }
        },
        {
          type: 'number'
        }
      ]
    }
  },
  required: ['name', 'age', 'pets']
}

const ajv = new Ajv({ allErrors: true, jsonPointers: true })

ajv.addKeyword('test', {
  validate(schema, data) {
    console.log(schema, data)
    return schema
  }
})

require('ajv-errors')(ajv)
const validate = ajv.compile(schema)
const valid = validate({
  name: 'york',
  age: 12,
  pets: ['nigel', 11]
})
if (!valid) {
  localize.zh(validate.errors)
  console.log(validate.errors)
}