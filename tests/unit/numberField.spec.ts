import { NumberField } from '../../lib'
import { mount } from '@vue/test-utils'
import TestComponent from './utils/TestComponent'

describe('测试NumberField组件', () => {
  it('输入测试', async () => {
    let value = ''
    const wrapper = mount(TestComponent, {
      props: {
        value: value,
        onChange: (v: any) => {
          value = v
        },
        schema: {
          type: 'number',
        },
        rootSchema: {},
      },
    })
    const _NumberField = wrapper.findComponent(NumberField)
    expect(_NumberField.exists()).toBeTruthy()
    const input = _NumberField.find('input')
    input.element.value = '123'
    await input.trigger('input')
    expect(value).toBe(123)
    // _NumberField.props('onChange')('123')
    // expect(value).toBe('123')
  })
})
