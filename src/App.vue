<script lang="ts">
import { defineComponent, ref } from 'vue'
import { RouterView } from 'vue-router'
import Navbar1 from './components/navbar_1.vue'

export default defineComponent({
  name: 'App',
  components: {
    RouterView,
    Navbar1,
  },
  setup() {
    const layout = ref('default')
    const layouts = ref(['default', 'dashboard'])
    return {
      layout,
      layouts,
    }
  }
})

</script>

<template>
  <Navbar1 />
  <RouterView />
</template>

<style scoped></style>
