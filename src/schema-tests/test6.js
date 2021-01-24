const Ajv = require('ajv')
const ajv = new Ajv()
ajv.addKeyword('test', {
  macro(schema, parentSchema) {
    return {
      minLength: 10 // 这里是增加test关键字所在的那个schema的属性
    }
  }
})
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      test: false
    },
    age: {
      type: 'number'
    }
  }
}

const validate = ajv.compile(schema)
const valid = validate({
  name: '1',
  age: 12
})

if (!valid) console.log('错误--->', validate.errors)