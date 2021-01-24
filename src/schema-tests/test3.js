const Ajv = require('ajv')
const ajv = new Ajv()
ajv.addFormat('name', (name) => {
  return name === 'york'
})
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    age: {
      type: 'number'
    },
    pets: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  },
  required: ['name']
}
const validate = ajv.compile(schema)
const valid = validate({
  name: 'york',
  age: 19,
  pets: ['doudou', 'duoduo']
})

if (!valid) console.log('错了', validate.errors)
