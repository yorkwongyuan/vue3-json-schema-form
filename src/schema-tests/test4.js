const Ajv = require('ajv')
const ajv = new Ajv()
ajv.addFormat('test', (value) => {
  return value === 'york'
})
ajv.addKeyword('keke', {
  validate: (schema, data) => {
    return schema > data
  }
})
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      format: 'test'
    },
    age: {
      type: 'number',
      keke: 100
    },
    test: {
      type: 'string',
      format: 'test'
    }
  }
}
const validate = ajv.compile(schema)
const valid = validate({
  name: 'york',
  age: 12,
  format: 'test'
})

if (!valid) console.log(validate.errors)