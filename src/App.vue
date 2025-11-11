<script lang="ts">
import { defineComponent, ref, watch, provide } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Navbar1 from './components/navbar_1.vue'
import Navbar2 from './components/navbar_2.vue'

interface Navbar2Instance extends ComponentPublicInstance {
  toggleSidebar: () => void
  sidebarVisible: { value: boolean }
}

export default defineComponent({
  name: 'App',
  components: {
    RouterView,
    Navbar1,
    Navbar2,
  },
  setup() {
    const route = useRoute()
    const layout = ref('default')
    const layouts = ref(['default', 'dashboard'])
    const navbar2Ref = ref<Navbar2Instance | null>(null)

    // 根據路由切換 layout
    watch(() => route.path, (newPath) => {
      if (newPath === '/dashboard' || newPath === '/courses'
        || newPath === '/auth'
      ) {
        layout.value = 'dashboard'
      } else {
        layout.value = 'default'
      }
    }, { immediate: true })

    // 提供 toggleSidebar 功能給子組件使用
    const toggleSidebar = () => {
      if (navbar2Ref.value) {
        navbar2Ref.value.toggleSidebar()
      }
    }

    // 創建響應式的 sidebarVisible 狀態
    const sidebarVisible = ref(false)

    // 監聽 navbar2 的 sidebarVisible 變化
    watch(() => navbar2Ref.value?.sidebarVisible?.value, (newVal) => {
      if (newVal !== undefined) {
        sidebarVisible.value = newVal
      }
    }, { immediate: true })

    provide('toggleSidebar', toggleSidebar)
    provide('sidebarVisible', sidebarVisible)

    return {
      layout,
      layouts,
      route,
      navbar2Ref,
    }
  }
})

</script>

<template>
  <Navbar1 v-if="layout === 'default'" />
  <Navbar2 v-if="layout === 'dashboard'" ref="navbar2Ref" />
  <RouterView />
</template>

<style scoped></style>
