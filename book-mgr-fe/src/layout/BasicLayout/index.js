import { defineComponent } from 'vue'
import Nav from './Nav/index.vue'

export default defineComponent({
  components: {
    AppNav: Nav, // rename it to AppNav to prevent conflict with vue's 'Nav'
  },
})
