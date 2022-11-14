import { defineComponent, ref, reactive, watch } from 'vue' // Code hint; Create responsive data
import { book } from '@/service'
import { message } from 'ant-design-vue'
import { result, clone } from './../../../helpers/utils/index'
import { context } from 'ant-design-vue/lib/vc-image/src/PreviewGroup'
import { FundTwoTone } from '@ant-design/icons-vue'
import moment from 'moment'

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
    book: Object, //from ./book/.vue 's :book
  },

  // hook fn: will only be called when the component is initialized
  setup(props, context) {
    const editForm = reactive({
      name: '',
      price: 0,
      author: '',
      publishDate: '',
      classify: '',
    })
    // watch if reactive/ref has changed, and trigger the cb func if changed
    // watch(()=>ref, cb)
    // current: modified data
    watch(
      () => props.book,
      (current) => {
        Object.assign(editForm, current)
        editForm.publishDate = ''
      }
    )

    // console.log(book)
    // Object.assign(editForm, book)

    // close update popup
    const close = () => {
      // context: update prop's attribute -- show to false
      context.emit('update:show', false)
    }

    const submit = async () => {
      // ... here act as extended operators
      const res = await book.update({
        id: props.book._id,
        name: editForm.name,
        price: editForm.price,
        author: editForm.author,
        classify: editForm.classify,
        publishDate: editForm.publishDate.valueOf(),
      })
      result(res).success(({ data, msg }) => {
        Object.assign(props.book, data)
        message.success(msg)
        close()
      })
    }

    return {
      editForm,
      submit,
      close,
      props,
    }
  },

  // register components
  components: {},
})