import { defineComponent } from 'vue' // Code hint
import {
  UserOutlined,
  KeyOutlined,
  ProfileOutlined,
} from '@ant-design/icons-vue' // icons

export default defineComponent({
  // hook fn: will only be called when the component is initialized
  setup() {},

  // register components
  components: {
    UserOutlined,
    KeyOutlined,
    ProfileOutlined,
  },
})
