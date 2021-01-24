export default {
  name: 'string',
  schema: {
    description: 'A simple form example.',
    type: 'string',
    minLength: 10,
    title: '标题',
  },
  uiSchema: {
    title: 'A registration form',
    properties: {
      firstName: {
        title: 'First name',
      },
      lastName: {
        title: 'Last name',
      },
      telephone: {
        title: 'Telephone',
      },
    },
  },
  default: '',
}
