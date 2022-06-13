import { defineComponent, reactive } from 'vue' // Code hint; Create responsive data
import {
  UserOutlined,
  KeyOutlined,
  ProfileOutlined,
} from '@ant-design/icons-vue' // icons
import { auth } from '@/service'
import { result } from '@/helpers/utils'
import { message } from 'ant-design-vue'

export default defineComponent({
  // hook fn: will only be called when the component is initialized
  setup() {
    // get responsive data from reactive
    const regForm = reactive({
      account: '',
      password: '',
      inviteCode: '',
    })
    const loginForm = reactive({
      account: '',
      password: '',
    })

    // register logic
    const register = async () => {
      // pass the data to back-end router
      // get ctx.body from promise
      const res = await auth.register(
        regForm.account,
        regForm.password,
        regForm.inviteCode
      )

      result(res).success((data) => {
        message.success(data.msg)
      })
    }

    // login logic
    const login = async () => {
      const res = await auth.login(loginForm.account, loginForm.password)

      result(res).success((data) => {
        message.success(data.msg)
      })
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
