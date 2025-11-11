<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, inject } from 'vue'

const searchText = ref('')
const categoryFilter = ref('全部')
const difficultyFilter = ref('全部')
const courseCount = ref(2)

const categories = ['全部', '野外可食植物辨識', '地景生態觀察', '生態記錄與分享']
const difficulties = ['全部', '初級', '中級', '高級']

// 從 App.vue 注入 toggleSidebar 功能和 sidebarVisible 狀態
const toggleSidebar = inject<() => void>('toggleSidebar', () => { })
const sidebarVisible = inject<{ value: boolean }>('sidebarVisible', { value: false })
</script>

<template>
  <div class="dashboard-layout">
    <!-- 右半邊主要內容區域 -->
    <div class="main-content">
      <!-- 頂部導航欄 -->
      <div class="top-nav">
        <div class="nav-left">
          <button class="ui icon button menu-btn" @click="toggleSidebar">
            <i class="bars icon"></i>
          </button>
        </div>
        <div class="nav-center">
          <div class="ui icon input search-input">
            <input type="text" placeholder="Find something..." v-model="searchText">
            <i class="search icon"></i>
          </div>
        </div>
        <div class="nav-right">
          <RouterLink to="/auth" class="ui button">登入/註冊</RouterLink>
        </div>
      </div>

      <!-- 主要內容 -->
      <div class="content-wrapper">
        <!-- Hero Section -->
        <div class="hero-section">
          <div class="hero-content">
            <h1 class="hero-title">探索學習主題</h1>
            <p class="hero-subtitle">
              選擇您感興趣的課程，開始您的自主學習之旅
            </p>
          </div>
        </div>

        <!-- Search and Filter Section -->
        <div class="filter-section">
          <div class="ui container">
            <div class="ui grid">
              <div class="ten wide column">
                <div class="ui icon input" style="width: 100%;">
                  <input type="text" placeholder="搜尋課程..." v-model="searchText">
                  <i class="search icon"></i>
                </div>
              </div>
              <div class="three wide column">
                <div class="ui selection dropdown" style="width: 100%;">
                  <input type="hidden" v-model="categoryFilter">
                  <i class="dropdown icon"></i>
                  <div class="default text">課程分類</div>
                  <div class="menu">
                    <div class="item" v-for="cat in categories" :key="cat" @click="categoryFilter = cat">
                      {{ cat }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="three wide column">
                <div class="ui selection dropdown" style="width: 100%;">
                  <input type="hidden" v-model="difficultyFilter">
                  <i class="dropdown icon"></i>
                  <div class="default text">難度等級</div>
                  <div class="menu">
                    <div class="item" v-for="diff in difficulties" :key="diff" @click="difficultyFilter = diff">
                      {{ diff }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="course-count">
              找到 {{ courseCount }} 個課程
            </div>
          </div>
        </div>

        <!-- Course Cards Section -->
        <div class="courses-section">
          <div class="ui container">
            <div class="ui three column stackable grid">
              <div class="column" v-for="i in 2" :key="i">
                <div class="ui card course-card">
                  <div class="image">
                    <div class="course-image-placeholder">
                      <i class="huge book icon"></i>
                    </div>
                  </div>
                  <div class="content">
                    <div class="header">課程標題 {{ i }}</div>
                    <div class="meta">
                      <span class="date">適合所有程度</span>
                    </div>
                    <div class="description">
                      這是一個課程描述，介紹課程的主要內容和學習目標。
                    </div>
                  </div>
                  <div class="extra content">
                    <div class="ui two buttons">
                      <button class="ui basic button">查看詳情</button>
                      <button class="ui primary button">開始學習</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 手機版遮罩 -->
    <div v-if="sidebarVisible" class="sidebar-overlay" @click="toggleSidebar"></div>
  </div>
</template>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  background-color: #f8f9fa;
  overflow-x: hidden;
  width: 100%;
}

/* 右半邊主要內容區域 */
.main-content {
  flex: 1;
  margin-left: 280px;
  background-color: white;
  transition: margin-left 0.3s ease;
  min-height: 100vh;
  width: calc(100% - 280px);
  box-sizing: border-box;
}

/* 頂部導航欄 */
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #e1e5e9;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-left,
.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-input {
  width: 300px;
}

.menu-btn {
  display: none;
}

/* 主要內容 */
.content-wrapper {
  padding: 0;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 80px 24px;
  text-align: center;
  color: white;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 16px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 20px;
  margin-bottom: 32px;
  opacity: 0.9;
  line-height: 1.5;
}

/* Filter Section */
.filter-section {
  padding: 32px 24px;
  background-color: white;
  border-bottom: 1px solid #e1e5e9;
}

.course-count {
  margin-top: 16px;
  color: #6b7280;
  font-size: 14px;
}

/* Courses Section */
.courses-section {
  padding: 32px 24px;
  background-color: #f8f9fa;
  min-height: 60vh;
}

.course-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.course-image-placeholder {
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

/* 手機版遮罩 */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: none;
}

@media (max-width: 1023px) {
  .sidebar-overlay {
    display: block;
  }
}

/* Responsive Design */
@media (max-width: 1023px) {
  .main-content {
    margin-left: 0 !important;
    width: 100% !important;
    overflow-x: hidden;
  }

  .menu-btn {
    display: block;
  }

  .search-input {
    width: 200px;
  }

  .nav-right {
    display: none;
  }
}

@media (max-width: 599px) {
  .search-input {
    width: 150px;
  }

  .nav-center {
    flex: 1;
    margin: 0 16px;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-subtitle {
    font-size: 18px;
  }
}
</style>
