import Selection from './SelectionWidget'
import Text from './TextWidget'
import NumberWidget from './NumberWidget'
import { commonThemeProps, CommonWidgetDefine } from '../types'
import { defineComponent } from 'vue'
const commonWidget: CommonWidgetDefine = defineComponent({
  name: 'commonWidget',
  props: commonThemeProps,
  setup() {
    return () => null
  },
})
export default {
  widgets: {
    Selection: Selection,
    TextWidget: Text,
    NumberWidget: NumberWidget,
  },
}
