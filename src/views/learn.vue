<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed, inject, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchCourseById, type Course } from '../services/api'
// 保留靜態數據作為後備方案
import { courses as staticCourses } from '../data/courses'

const route = useRoute()
const router = useRouter()

// 從 App.vue 注入 toggleSidebar 功能和 sidebarVisible 狀態
const toggleSidebar = inject<() => void>('toggleSidebar', () => { })
const sidebarVisible = inject<{ value: boolean }>('sidebarVisible', { value: false })

// 獲取課程 ID
const courseId = computed(() => {
  const id = route.params.id
  return typeof id === 'string' ? parseInt(id, 10) : Number(id)
})

// 課程數據
const course = ref<Course | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

// 從 API 獲取課程數據
const loadCourse = async () => {
  loading.value = true
  error.value = null
  
  try {
    // 嘗試從 API 獲取數據
    course.value = await fetchCourseById(courseId.value)
  } catch (err) {
    console.error('Failed to load course from API, using static data:', err)
    // 如果 API 失敗，使用靜態數據作為後備
    const staticCourse = staticCourses.find(c => c.id === courseId.value)
    if (staticCourse) {
      course.value = staticCourse as Course
    } else {
      error.value = '找不到此課程'
    }
  } finally {
    loading.value = false
  }
}

// 組件掛載時載入數據
onMounted(() => {
  if (!courseId.value || isNaN(courseId.value)) {
    router.push('/courses')
    return
  }
  loadCourse()
})

// 返回課程列表
const goBack = () => {
  router.push('/courses')
}
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
            <input type="text" placeholder="Find something...">
            <i class="search icon"></i>
          </div>
        </div>
        <div class="nav-right">
          <RouterLink to="/auth" class="ui button">登入/註冊</RouterLink>
        </div>
      </div>

      <!-- 主要內容 -->
      <!-- 載入中狀態 -->
      <div class="content-wrapper" v-if="loading">
        <div class="ui container">
          <div class="loading-section">
            <div class="ui active centered inline loader"></div>
            <p style="text-align: center; margin-top: 1rem; color: #666;">載入課程中...</p>
          </div>
        </div>
      </div>
      
      <!-- 錯誤狀態 -->
      <div class="content-wrapper" v-else-if="error">
        <div class="ui container">
          <div class="no-course">
            <i class="huge exclamation triangle icon"></i>
            <h2>{{ error }}</h2>
            <button class="ui primary button" @click="router.push('/courses')">返回課程列表</button>
          </div>
        </div>
      </div>
      
      <!-- 課程內容 -->
      <div class="content-wrapper" v-else-if="course">
        <div class="ui container">
          <!-- 返回按鈕 -->
          <div class="back-button-section">
            <button class="ui button" @click="goBack">
              <i class="arrow left icon"></i>
              返回課程列表
            </button>
          </div>

          <!-- 課程標題區域 -->
          <div class="course-header-section">
            <div class="course-header">
              <h1 class="course-title">{{ course.title }}</h1>
              <div class="course-meta-info">
                <span class="meta-item">
                  <i class="user icon"></i>
                  {{ course.teacher }}
                </span>
                <span class="meta-item">
                  <i class="tag icon"></i>
                  {{ course.category }}
                </span>
                <span class="meta-item">
                  <i class="graduation cap icon"></i>
                  {{ course.level }}
                </span>
                <span class="meta-item">
                  <i class="clock icon"></i>
                  {{ course.duration }}
                </span>
              </div>
            </div>
          </div>

          <!-- 課程內容區域 -->
          <div class="course-content-section">
            <div class="ui two column stackable grid">
              <!-- 左側：影片區域 -->
              <div class="twelve wide column">
                <div class="video-section">
                  <h2 class="section-title">課程影片</h2>
                  <div class="video-container" v-if="course.videoUrl">
                    <iframe
                      :src="course.videoUrl"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                      class="course-video"
                    ></iframe>
                  </div>
                  <div v-else class="no-video">
                    <i class="huge video icon"></i>
                    <p>此課程暫無影片</p>
                  </div>
                </div>

                <!-- 課程描述 -->
                <div class="description-section">
                  <h2 class="section-title">課程介紹</h2>
                  <div class="ui segment">
                    <p class="course-description">{{ course.description }}</p>
                  </div>
                </div>
              </div>

              <!-- 右側：課程資訊 -->
              <div class="four wide column">
                <div class="course-info-card">
                  <div class="ui card">
                    <div class="content">
                      <div class="header">課程資訊</div>
                    </div>
                    <div class="content">
                      <div class="info-item">
                        <i class="tag icon"></i>
                        <strong>分類：</strong>
                        <span>{{ course.category }}</span>
                      </div>
                      <div class="info-item">
                        <i class="graduation cap icon"></i>
                        <strong>難度：</strong>
                        <span>{{ course.level }}</span>
                      </div>
                      <div class="info-item">
                        <i class="clock icon"></i>
                        <strong>時長：</strong>
                        <span>{{ course.duration }}</span>
                      </div>
                      <div class="info-item">
                        <i class="user icon"></i>
                        <strong>講師：</strong>
                        <span>{{ course.teacher }}</span>
                      </div>
                      <div class="info-item" v-if="course.price !== undefined">
                        <i class="dollar sign icon"></i>
                        <strong>價格：</strong>
                        <span v-if="course.price === 0" class="free">免費</span>
                        <span v-else>NT$ {{ course.price }}</span>
                      </div>
                    </div>
                    <div class="extra content">
                      <div class="ui two buttons">
                        <button class="ui primary button" @click="goBack">
                          <i class="list icon"></i>
                          查看其他課程
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 找不到課程時顯示 -->
      <div class="content-wrapper" v-else>
        <div class="ui container">
          <div class="no-course">
            <i class="huge exclamation triangle icon"></i>
            <h2>找不到此課程</h2>
            <p>課程可能已被移除或不存在</p>
            <button class="ui primary button" @click="goBack">返回課程列表</button>
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
  background-color: #f8f9fa;
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
  padding: 40px 0;
}

.ui.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 返回按鈕 */
.back-button-section {
  margin-bottom: 24px;
}

/* 課程標題區域 */
.course-header-section {
  background: white;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.course-title {
  font-size: 44px; /* 從 36px 增加到 44px */
  font-weight: 700;
  color: #333;
  margin-bottom: 16px;
  line-height: 1.2;
}

.course-meta-info {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  font-size: 17px; /* 從 14px 增加到 17px */
}

.meta-item i {
  color: #667eea;
}

/* 課程內容區域 */
.course-content-section {
  margin-top: 24px;
}

.video-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 29px; /* 從 24px 增加到 29px */
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 比例 */
  height: 0;
  overflow: hidden;
  border-radius: 8px;
  background: #000;
}

.course-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.no-video {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.no-video i {
  margin-bottom: 16px;
  opacity: 0.5;
}

.no-video p {
  font-size: 18px;
  margin-top: 16px;
}

/* 描述區域 */
.description-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.course-description {
  font-size: 19px; /* 從 16px 增加到 19px */
  line-height: 1.8;
  color: #555;
  margin: 0;
}

/* 課程資訊卡片 */
.course-info-card {
  position: sticky;
  top: 100px;
}

.course-info-card .ui.card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 17px; /* 從 14px 增加到 17px */
}

.info-item i {
  color: #667eea;
  width: 20px;
}

.info-item strong {
  color: #333;
  min-width: 60px;
}

.info-item span {
  color: #666;
}

.info-item .free {
  color: #4caf50;
  font-weight: 600;
}

/* 找不到課程 */
.no-course {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.no-course i {
  color: #ff9800;
  margin-bottom: 24px;
}

.no-course h2 {
  font-size: 34px; /* 從 28px 增加到 34px */
  color: #333;
  margin-bottom: 16px;
}

.no-course p {
  font-size: 19px; /* 從 16px 增加到 19px */
  color: #666;
  margin-bottom: 32px;
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

  .course-info-card {
    position: static;
    margin-top: 24px;
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

  .course-title {
    font-size: 29px; /* 從 24px 增加到 29px */
  }

  .course-meta-info {
    flex-direction: column;
    gap: 12px;
  }

  .video-section,
  .description-section,
  .course-header-section {
    padding: 16px;
  }
}
</style>

