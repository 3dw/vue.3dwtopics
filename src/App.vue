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
  <!-- 樣稿 Ribbon -->
  <div class="sample-ribbon">
    <span>樣稿</span>
  </div>
</template>

<style scoped></style>

<style>
/* 樣稿 Ribbon - 全局樣式 */
.sample-ribbon {
  position: fixed;
  top: 10px;
  right: -50px;
  background-color: #ffd700;
  color: #000;
  padding: 8px 60px;
  font-size: 22px;
  font-weight: bold;
  transform: rotate(45deg);
  z-index: 9999;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  pointer-events: none;
  user-select: none;
}

.sample-ribbon span {
  display: block;
  white-space: nowrap;
}
</style>
