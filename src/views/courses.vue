<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, inject, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchCourses, type Course } from '../services/api'
// 保留靜態數據作為後備方案
import { courses as staticCourses } from '../data/courses'

const router = useRouter()

// 課程數據
const courses = ref<Course[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// 搜尋和篩選
const searchText = ref('')
const categoryFilter = ref('全部')
const difficultyFilter = ref('全部')

// 從 API 獲取課程數據
const loadCourses = async () => {
  loading.value = true
  error.value = null
  
  try {
    // 嘗試從 API 獲取數據
    courses.value = await fetchCourses()
  } catch (err) {
    console.error('Failed to load courses from API, using static data:', err)
    // 如果 API 失敗，使用靜態數據作為後備
    courses.value = staticCourses as Course[]
    error.value = '無法連接到伺服器，顯示本地數據'
  } finally {
    loading.value = false
  }
}

// 組件掛載時載入數據
onMounted(() => {
  loadCourses()
})

// 從 courses 數據中動態獲取分類
const categories = computed(() => {
  if (courses.value.length === 0) return ['全部']
  const cats = new Set(courses.value.map(course => course.category))
  return ['全部', ...Array.from(cats)]
})

// 從 courses 數據中動態獲取難度等級
const difficulties = computed(() => {
  if (courses.value.length === 0) return ['全部']
  const levels = new Set(courses.value.map(course => course.level))
  return ['全部', ...Array.from(levels)]
})

// 過濾課程
const filteredCourses = computed(() => {
  return courses.value.filter(course => {
    // 搜尋過濾
    const matchesSearch = !searchText.value ||
      course.title.toLowerCase().includes(searchText.value.toLowerCase()) ||
      course.description.toLowerCase().includes(searchText.value.toLowerCase())

    // 分類過濾
    const matchesCategory = categoryFilter.value === '全部' ||
      course.category === categoryFilter.value

    // 難度過濾
    const matchesLevel = difficultyFilter.value === '全部' ||
      course.level === difficultyFilter.value

    return matchesSearch && matchesCategory && matchesLevel
  })
})

// 課程數量
const courseCount = computed(() => filteredCourses.value.length)

// 從 App.vue 注入 toggleSidebar 功能和 sidebarVisible 狀態
const toggleSidebar = inject<() => void>('toggleSidebar', () => { })
const sidebarVisible = inject<{ value: boolean }>('sidebarVisible', { value: false })

// 查看課程詳情
const viewCourse = (courseId: number) => {
  router.push(`/course/${courseId}`)
}

// 開始學習
const startLearning = (courseId: number) => {
  router.push(`/learn/${courseId}`)
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
                <select v-model="categoryFilter" class="ui dropdown" style="width: 100%;">
                  <option v-for="cat in categories" :key="cat" :value="cat">
                    {{ cat }}
                  </option>
                </select>
              </div>
              <div class="three wide column">
                <select v-model="difficultyFilter" class="ui dropdown" style="width: 100%;">
                  <option v-for="diff in difficulties" :key="diff" :value="diff">
                    {{ diff }}
                  </option>
                </select>
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
            <!-- 載入中狀態 -->
            <div v-if="loading" class="loading-section">
              <div class="ui active centered inline loader"></div>
              <p style="text-align: center; margin-top: 1rem; color: #666;">載入課程中...</p>
            </div>
            
            <!-- 錯誤訊息 -->
            <div v-else-if="error" class="ui warning message">
              <i class="warning icon"></i>
              {{ error }}
            </div>
            
            <!-- 沒有找到課程 -->
            <div v-else-if="!loading && filteredCourses.length === 0" class="no-courses">
              <i class="huge search icon"></i>
              <p>沒有找到符合條件的課程</p>
            </div>
            <!-- 課程列表 -->
            <div v-else-if="!loading && filteredCourses.length > 0" class="ui three column stackable grid">
              <div class="column" v-for="course in filteredCourses" :key="course.id">
                <div class="ui card course-card">
                  <div class="image">
                    <div class="course-image-placeholder">
                      <i class="huge book icon"></i>
                    </div>
                  </div>
                  <div class="content">
                    <div class="header">{{ course.title }}</div>
                    <div class="meta">
                      <span class="date">{{ course.level }}</span>
                      <span class="date">{{ course.duration }}</span>
                    </div>
                    <div class="description">
                      {{ course.description }}
                    </div>
                    <div class="meta">
                      <span class="teacher">
                        <i class="user icon"></i>
                        {{ course.teacher }}
                      </span>
                      <span class="category">
                        <i class="tag icon"></i>
                        {{ course.category }}
                      </span>
                    </div>
                  </div>
                  <div class="extra content">
                    <div class="course-price">
                      <span v-if="course.price === 0" class="price free">免費</span>
                      <span v-else class="price">NT$ {{ course.price }}</span>
                    </div>
                    <div class="ui two buttons">
                      <button class="ui basic button" @click="viewCourse(course.id)">查看詳情</button>
                      <button class="ui primary button" @click="startLearning(course.id)">開始學習</button>
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

/* Select 樣式 */
select.ui.dropdown {
  padding: 8px 12px;
  border: 1px solid #d4d4d5;
  border-radius: 4px;
  background-color: white;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: border-color 0.2s;
}

select.ui.dropdown:hover {
  border-color: #85b7d9;
}

select.ui.dropdown:focus {
  outline: none;
  border-color: #85b7d9;
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

.no-courses {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.no-courses i {
  margin-bottom: 16px;
  opacity: 0.5;
}

.no-courses p {
  font-size: 18px;
  margin-top: 16px;
}

/* 載入中樣式 */
.loading-section {
  padding: 60px 20px;
  text-align: center;
}

.course-price {
  margin-bottom: 12px;
}

.course-price .price {
  font-size: 20px;
  font-weight: 600;
  color: #667eea;
}

.course-price .price.free {
  color: #4caf50;
}

.teacher,
.category {
  display: inline-block;
  margin-right: 16px;
  color: #666;
  font-size: 14px;
}

.teacher i,
.category i {
  margin-right: 4px;
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
