const Ajv = require('ajv')
const ajv = new Ajv()
ajv.addFormat('rightName', (value) => {
  return value === 'nigel'
})
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      // minLength: 10,
      format: 'rightName'
    },
    age: {
      type: 'number'
    },
    email: {
      type: 'string',
      format: 'email'
    }
  }
}
const validate = ajv.compile(schema)

const valid = validate({
  name: 'nigel',
  age: 111,
  email: 'www1d@d.com'
})
if (!valid) console.log(validate.errors)