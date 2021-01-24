const Ajv = require('ajv')

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      test: false
      // format: 'test'
    },
    age: {
      type: 'number'
    },
    pets: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    isWorker: {
      type: 'boolean'
    }
  },
  required: ['name', 'age']
}


const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
// ajv.addFormat('test', (value) => {
//   console.log('这个是一个自定义的format')
//   return value === 'york'
// })
ajv.addKeyword('test', {
  // 这里的schema指的是定义的时候test关键字的值
  // data指的是使用的时候name的值
  validate(schema, data) {
    return schema
  }
})
const validate = ajv.compile(schema)
const valid = validate({
  name: 'york',
  age: 19,
  pets: ['duoduo', 'doudou'],
  isWorker: true
})
if (!valid) console.log(validate.errors)
