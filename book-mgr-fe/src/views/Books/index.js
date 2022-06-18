import { defineComponent } from 'vue' // Code hint; Create responsive data

export default defineComponent({
  // hook fn: will only be called when the component is initialized
  setup() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
    ]
    const dataSource = [
      {
        name: 'Tomas',
        age: 35,
      },
    ]

    return {
      columns,
      dataSource,
    }
  },

  // register components
  components: {},
})
