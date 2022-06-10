import { defineComponent, reactive } from 'vue' // Code hint; Create responsive data
import {
  UserOutlined,
  KeyOutlined,
  ProfileOutlined,
} from '@ant-design/icons-vue' // icons
import { auth } from '@/service'

export default defineComponent({
  // hook fn: will only be called when the component is initialized
  setup() {
    // get responsive data from reactive
    const regForm = reactive({
      account: '',
      password: '',
    })
    const loginForm = reactive({
      account: '',
      password: '',
    })

    // fn that deal with click events
    const register = () => {
      // pass the data to back-end router
      auth.register(regForm.account, regForm.password)
    }
    const login = () => {
      auth.login(regForm.account, regForm.password)
    }

    return {
      regForm,
      loginForm,
      register,
      login,
    }
  },

  // register components
  components: {
    UserOutlined,
    KeyOutlined,
    ProfileOutlined,
  },
})
