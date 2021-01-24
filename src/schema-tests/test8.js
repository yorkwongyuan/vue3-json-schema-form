const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true, jsonPointers: true })
require('ajv-errors')(ajv) // 所谓的ajv-errors只支持原生关键字.
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 10,
      // errorMessage: {
      //   type: '类型错误',
      //   minLength: '长度不够啊, 白痴'
      // }
    },
    pets: {
      type: 'array',
      items: [
        { type: 'string', minLength: 2 },
        { type: 'number' }
      ]
    }
  }
}
const validate = ajv.compile(schema)
const valid = validate({
  name: '11',
  pets: ['1']
})

if (!valid) {
  console.log(validate.errors)
}