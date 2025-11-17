<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const sidebarVisible = ref(false)

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value
}

defineExpose({
  toggleSidebar,
  sidebarVisible
})
</script>

<template>
  <div class="layout-container">
    <!-- 左邊欄位選單導航列 -->
    <div class="sidebar" :class="{ 'sidebar-visible': sidebarVisible }">
      <div class="sidebar-header">
        <RouterLink to="/" class="logo">
          <i class="graduation cap icon" style="color: #2185d0; font-size: 24px;"></i>
          <span class="logo-text">3dw</span>
        </RouterLink>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section">
          <div class="nav-title">自主學習促進會線上課程平台</div>
          <div class="ui list">
            <RouterLink to="/courses" class="nav-item item" :class="{ active: route.path === '/courses' }">
              <i class="book icon"></i>
              <div class="content">
                <div class="header">課程列表</div>
              </div>
            </RouterLink>
            <RouterLink to="/dashboard" class="nav-item item" :class="{ active: route.path === '/dashboard' }">
              <i class="dashboard icon"></i>
              <div class="content">
                <div class="header">學習儀表板</div>
              </div>
            </RouterLink>
            <RouterLink to="/freemath" class="nav-item item" :class="{ active: route.path === '/freemath' }">
              <i class="calculator icon"></i>
              <div class="content">
                <div class="header">自由數學</div>
              </div>
            </RouterLink>
            <RouterLink to="/auth" class="nav-item item" :class="{ active: route.path === '/auth' }">
              <i class="user circle icon"></i>
              <div class="content">
                <div class="header">登入/註冊</div>
              </div>
            </RouterLink>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  position: relative;
}

/* 左邊欄位選單導航列 */
.sidebar {
  width: 280px;
  background-color: white;
  border-right: 1px solid #e1e5e9;
  padding: 20px 0;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  z-index: 1000;
  transition: transform 0.3s ease;
  left: 0;
  top: 0;
}

.sidebar-header {
  padding: 0 24px 24px;
  border-bottom: 1px solid #e1e5e9;
  margin-bottom: 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-text {
  font-size: 29px; /* 從 24px 增加到 29px */
  font-weight: bold;
  color: #1a1a1a;
}

.sidebar-nav {
  padding: 0 24px;
}

.nav-section {
  margin-bottom: 32px;
}

.nav-title {
  font-size: 17px; /* 從 14px 增加到 17px */
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.nav-item {
  margin-bottom: 4px;
  border-radius: 8px;
  padding: 8px 12px !important;
  transition: all 0.2s ease;
  display: flex !important;
  align-items: center;
  text-decoration: none;
  color: #1a1a1a;
}

.nav-item:hover {
  background-color: #f3f4f6;
}

.nav-item.active {
  background-color: #e0e7ff;
  color: #3730a3;
}

.nav-item.active .icon {
  color: #3730a3;
}

.nav-item .icon {
  margin-right: 12px;
}

/* Responsive Design */
@media (max-width: 1023px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.sidebar-visible {
    transform: translateX(0);
  }
}
</style>
