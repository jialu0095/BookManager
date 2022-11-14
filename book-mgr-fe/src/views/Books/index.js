import { defineComponent, ref, onMounted, reactive } from 'vue' // Code hint; Create responsive data
import AddOne from './AddOne/index.vue'
import Update from './Update/index.vue'
import { message, Modal, Input } from 'ant-design-vue'
import { book } from '@/service'
import { result, formatTsp } from '@/helpers/utils'

export default defineComponent({
  // hook fn: will only be called when the component is initialized
  setup() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Author',
        dataIndex: 'author',
      },
      {
        title: 'Price',
        dataIndex: 'price',
      },
      {
        title: 'Publish Date',
        dataIndex: 'publishDate',
      },
      {
        title: 'Classify',
        dataIndex: 'classify',
      },
      {
        title: 'Count',
        dataIndex: 'count',
      },
      {
        title: 'Operation',
        dataIndex: 'operation',
      },
    ]

    // add book popup
    const show = ref(false)
    const showT = ref(false)
    const showEdit = ref(false)

    const list = ref([])
    const total = ref(0)
    const currentPage = ref(1)
    const isSearch = ref(false) // if is searching by book name

    // search by book name
    const keyword = ref('')

    // get current page's book list
    const getList = async () => {
      const res = await book.list({
        page: currentPage.value,
        size: 10,
        keyword: keyword.value,
      })

      // show list data in the book list
      result(res).success(({ data }) => {
        const { list: l, total: t } = data
        list.value = l
        total.value = t
      })
    }

    // reset page to currentPage
    // param page will be passed when setPage is called in a-pagination component
    const setPage = async (page) => {
      currentPage.value = page
      getList()
    }

    // executer this when the component is mounted
    onMounted(async () => {
      getList()
    })

    // execute search book
    const onSearch = () => {
      getList()
      isSearch.value = keyword.value
    }

    // back to initial list after searched
    const backAll = () => {
      keyword.value = ''
      isSearch.value = false
      getList()
    }

    // delete book
    const remove = async (record) => {
      const { _id } = record
      const res = await book.remove(_id)

      result(res).success(({ msg }) => {
        message.success(msg)
      })

      // refresh book list
      getList()
    }

    // just adjust remain books quatity by 1
    const addOneBook = async (record) => {
      const { _id, count } = record
      const res = await book.updateCount({
        id: _id,
        count,
        type: 1,
        editCount: 1,
      })

      getList()
    }
    const minusOneBook = async (record) => {
      const { _id, count } = record
      const res = await book.updateCount({
        id: _id,
        count,
        type: 2,
        editCount: 1,
      })

      getList()
    }

    // adjust batch book remain quatity
    const visible = ref(false)
    const editCount = ref(0)
    const editType = ref('Add') // Add or Minus

    const showModal = () => {
      visible.value = true
    }

    // Excute when modal ok is clicked
    const handleOk = async (record) => {
      // type is referred as number in the backend
      let type = 1
      if (editType.value === 'Add') {
        type = 1
      }
      if (editType.value === 'Minus') {
        type = 2
      }

      const { _id, count } = record
      const res = await book.updateCount({
        id: _id,
        count,
        type: type,
        editCount: editCount.value,
      })
      editCount.value = 0
      editType.value = 'Add'
      getList()
      visible.value = false
    }

    // type selection for modal a-selection
    const options1 = reactive([
      {
        value: 'Add',
        label: 'Add',
      },
      {
        value: 'Minus',
        label: 'Minus',
      },
    ])

    const focus = () => {
      // execute when clicked
    }

    // execute when a-selection changed
    const handleChange = (value) => {
      if (value === 'Minus') {
        editType.value = 'Minus'
      } else {
        editType.value = 'Add'
      }
    }

    const curEditBook = ref({}) // middle param that pass cur edit book record to Update

    const update = async (record) => {
      showEdit.value = true
      curEditBook.value = record
    }

    return {
      columns,
      show,
      list,
      formatTsp,
      currentPage,
      total,
      setPage,
      keyword,
      onSearch,
      backAll,
      isSearch,
      remove,
      getList,
      addOneBook,
      minusOneBook,
      handleOk,
      showModal,
      visible,
      options1,
      focus,
      handleChange,
      editType,
      editCount,
      showEdit,
      update,
      curEditBook,
    }
  },

  // register components
  components: {
    AddOne,
    Update,
  },
})
