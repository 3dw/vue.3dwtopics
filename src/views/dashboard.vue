<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 從 App.vue 注入 toggleSidebar 功能和 sidebarVisible 狀態
const toggleSidebar = inject<() => void>('toggleSidebar', () => { })
const sidebarVisible = inject<{ value: boolean }>('sidebarVisible', { value: false })

const user = ref({
  name: '',
  email: 'user@example.com'
})

const stats = ref({
  totalCourses: 5,
  completedCourses: 2,
  totalHours: 24
})

interface Course {
  id: number
  title: string
  description: string
  category: string
  level?: string
  duration?: string
  students?: number
  price?: number
  originalPrice?: number | null
  image: string
  progress?: number
  completedLessons?: number
  totalLessons?: number
}

const inProgressCourses = ref<Course[]>([

])

const recommendedCourses = ref<Course[]>([

])

interface Achievement {
  id: number
  title: string
  description: string
  icon: string
  achieved: boolean
  progress: number
  current: number
  target: number
}

const achievements = ref<Achievement[]>([

])

const continueLearning = async (course: Course) => {
  await router.push(`/learn/${course.id}`)
}

const viewCourseDetail = async (course: Course) => {
  await router.push(`/course/${course.id}`)
}

const viewAllCourses = async () => {
  await router.push('/courses')
}

const browseCourses = async () => {
  await router.push('/courses')
}

const purchaseCourse = (course: Course) => {
  // 使用 Semantic UI 的確認對話框
  if (confirm(`確定要購買「${course.title}」課程嗎？`)) {
    alert('購買成功！課程已加入您的學習清單')
  }
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
      <div class="content-wrapper">
        <div class="ui container">
          <!-- 歡迎區域 -->
          <div class="welcome-section">
            <div class="welcome-content">
              <h1 class="welcome-title">歡迎回來！</h1>
              <p class="welcome-subtitle">繼續您的學習之旅</p>
            </div>
            <div class="ui three column stackable grid welcome-stats">
              <div class="column">
                <div class="ui card stat-card">
                  <div class="content">
                    <div class="stat-content">
                      <i class="huge university icon" style="color: #667eea;"></i>
                      <div class="stat-info">
                        <div class="stat-number">{{ stats.totalCourses }}</div>
                        <div class="stat-label">已購課程</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="ui card stat-card">
                  <div class="content">
                    <div class="stat-content">
                      <i class="huge check circle icon" style="color: #4caf50;"></i>
                      <div class="stat-info">
                        <div class="stat-number">{{ stats.completedCourses }}</div>
                        <div class="stat-label">已完成</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="ui card stat-card">
                  <div class="content">
                    <div class="stat-content">
                      <i class="huge clock icon" style="color: #ff9800;"></i>
                      <div class="stat-info">
                        <div class="stat-number">{{ stats.totalHours }}</div>
                        <div class="stat-label">學習時數</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 繼續學習 -->
          <div class="section">
            <div class="section-header">
              <h2 class="section-title">繼續學習</h2>
              <button class="ui basic button" @click="viewAllCourses">查看全部課程</button>
            </div>

            <div class="ui three column stackable grid courses-grid">
              <div class="column" v-for="course in inProgressCourses" :key="course.id">
                <div class="ui card course-card" @click="continueLearning(course)">
                  <div class="image course-image-wrapper">
                    <img :src="course.image" :alt="course.title" />
                    <div class="progress-overlay">
                      <div class="progress-circle">
                        <div class="progress-percentage">{{ course.progress }}%</div>
                      </div>
                    </div>
                  </div>

                  <div class="content">
                    <div class="course-category">{{ course.category }}</div>
                    <div class="header course-title">{{ course.title }}</div>
                    <div class="description course-description">{{ course.description }}</div>

                    <div class="course-progress">
                      <div class="ui indicating progress" :data-percent="course.progress">
                        <div class="bar" :style="{ width: course.progress + '%' }"></div>
                      </div>
                      <div class="progress-text">
                        {{ course.completedLessons }}/{{ course.totalLessons }} 課程
                      </div>
                    </div>

                    <div class="course-actions">
                      <button class="ui primary button" @click.stop="continueLearning(course)">繼續學習</button>
                      <button class="ui basic button" @click.stop="viewCourseDetail(course)">查看詳情</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 推薦課程 -->
          <div class="section">
            <div class="section-header">
              <h2 class="section-title">推薦課程</h2>
              <button class="ui basic button" @click="browseCourses">瀏覽更多</button>
            </div>

            <div class="ui three column stackable grid courses-grid">
              <div class="column" v-for="course in recommendedCourses" :key="course.id">
                <div class="ui card course-card" @click="viewCourseDetail(course)">
                  <div class="image course-image-wrapper">
                    <img :src="course.image" :alt="course.title" />
                    <div class="course-overlay">
                      <button class="ui primary button view-btn">查看詳情</button>
                    </div>
                  </div>

                  <div class="content">
                    <div class="course-category">{{ course.category }}</div>
                    <div class="header course-title">{{ course.title }}</div>
                    <div class="description course-description">{{ course.description }}</div>

                    <div class="course-meta">
                      <span class="meta-item">
                        <i class="clock icon"></i>
                        {{ course.duration }}
                      </span>
                      <span class="meta-item">
                        <i class="graduation cap icon"></i>
                        {{ course.level }}
                      </span>
                      <span class="meta-item">
                        <i class="users icon"></i>
                        {{ course.students }} 學員
                      </span>
                    </div>

                    <div class="course-footer">
                      <div class="course-price">
                        <span class="price">NT$ {{ course.price }}</span>
                        <span v-if="course.originalPrice" class="original-price">
                          NT$ {{ course.originalPrice }}
                        </span>
                      </div>
                      <button class="ui primary button" @click.stop="purchaseCourse(course)">立即購買</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 學習成就 -->
          <div class="section">
            <div class="section-header">
              <h2 class="section-title">學習成就</h2>
            </div>

            <div class="ui four column stackable grid achievements-grid">
              <div class="column" v-for="achievement in achievements" :key="achievement.id">
                <div class="ui card achievement-card" :class="{ 'achieved': achievement.achieved }">
                  <div class="content">
                    <div class="achievement-content">
                      <i
                        class="huge icon"
                        :class="achievement.icon.split(' ')"
                        :style="{ color: achievement.achieved ? '#4caf50' : '#ccc' }"
                      ></i>
                      <h3 class="achievement-title">{{ achievement.title }}</h3>
                      <p class="achievement-description">{{ achievement.description }}</p>
                      <div class="achievement-progress">
                        <div class="ui indicating progress" :data-percent="achievement.progress">
                          <div class="bar" :style="{ width: achievement.progress + '%' }"></div>
                        </div>
                        <div class="progress-text">
                          {{ achievement.current }}/{{ achievement.target }}
                        </div>
                      </div>
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

/* 歡迎區域 */
.welcome-section {
  background: white;
  border-radius: 12px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.welcome-content {
  margin-bottom: 30px;
}

.welcome-title {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
}

.welcome-subtitle {
  font-size: 18px;
  color: #666;
}

.welcome-stats {
  margin-top: 30px;
}

.stat-card {
  box-shadow: none !important;
  border: none !important;
}

.stat-card .content {
  padding: 20px !important;
  background: #f8f9fa;
  border-radius: 8px;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 16px;
}


.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

/* 區塊樣式 */
.section {
  background: white;
  border-radius: 12px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

/* 課程卡片 */
.courses-grid {
  margin-top: 0 !important;
}

.course-card {
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  border: 1px solid #e9ecef !important;
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
}

.course-image-wrapper {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.course-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.progress-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-circle {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 3px solid rgba(255, 255, 255, 0.5);
}

.progress-percentage {
  font-size: 18px;
  font-weight: 700;
  color: white;
}

.progress-text {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}

.course-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.course-card:hover .course-overlay {
  opacity: 1;
}

.course-category {
  color: #667eea;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
}

.course-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  line-height: 1.3;
}

.course-description {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 16px;
}

.course-progress {
  margin-bottom: 20px;
}

.course-progress .ui.progress {
  margin-bottom: 8px;
}

.course-progress .progress-text {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}

.course-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #666;
  font-size: 12px;
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.course-price {
  display: flex;
  flex-direction: column;
}

.price {
  font-size: 18px;
  font-weight: 600;
  color: #667eea;
}

.original-price {
  font-size: 12px;
  color: #999;
  text-decoration: line-through;
}

.course-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.course-actions .ui.button {
  flex: 1;
}

/* 成就卡片 */
.achievements-grid {
  margin-top: 0 !important;
}

.achievement-card {
  border: 1px solid #e9ecef !important;
  transition: all 0.2s;
}

.achievement-card.achieved {
  background: #f8fff8 !important;
  border-color: #4caf50 !important;
}

.achievement-content {
  text-align: center;
}

.achievement-content i {
  margin-bottom: 16px;
}

.achievement-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.achievement-description {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 16px;
}

.achievement-progress {
  margin-top: 16px;
}

.achievement-progress .ui.progress {
  margin-bottom: 8px;
}

.achievement-progress .progress-text {
  font-size: 12px;
  color: #666;
  position: static;
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

  .welcome-stats {
    grid-template-columns: 1fr;
  }

  .courses-grid {
    grid-template-columns: 1fr !important;
  }

  .achievements-grid {
    grid-template-columns: 1fr !important;
  }

  .section-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
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

  .welcome-title {
    font-size: 24px;
  }

  .welcome-subtitle {
    font-size: 16px;
  }

  .section {
    padding: 24px;
  }

  .welcome-section {
    padding: 24px;
  }
}
</style>
