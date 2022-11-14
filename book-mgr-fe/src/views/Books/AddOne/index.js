import { defineComponent, reactive } from 'vue' // Code hint; Create responsive data
import { book } from '@/service'
import { message } from 'ant-design-vue'
import { result, clone } from './../../../helpers/utils/index'
import { context } from 'ant-design-vue/lib/vc-image/src/PreviewGroup'
import { FundTwoTone } from '@ant-design/icons-vue'

// empty form
const defaultForm = {
  name: '',
  price: 0,
  author: '',
  publishDate: '',
  classify: '',
}

export default defineComponent({
  // attributes from other indexes that will be used in .vue templates
  props: {
    show: Boolean, //from ./book/.vue 's v-model:show
  },

  // hook fn: will only be called when the component is initialized
  setup(props, context) {
    const addForm = reactive({
      name: '',
      price: 0,
      author: '',
      publishDate: '',
      classify: '',
      count: 0,
    })

    const submit = async () => {
      // transfer date to timestp
      const form = clone(addForm)
      form.publishDate = addForm.publishDate.valueOf()
      const res = await book.add(form)

      result(res).success((data) => {
        // empty the form after submit
        Object.assign(addForm, defaultForm)
        message.success(data.msg)

        close() // close the popup after ok
      })
    }

    // close addOne popup
    const close = () => {
      // context: update prop's attribute -- show to false
      context.emit('update:show', false)
    }

    return {
      addForm,
      submit,
      close,
      props,
    }
  },

  // register components
  components: {},
})
