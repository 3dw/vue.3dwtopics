<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isLogin = ref(true)
const loading = ref(false)
const googleLoading = ref(false)

const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  name: ''
})

const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const nameError = ref('')

// 檢查是否有 OAuth 回調
onMounted(async () => {
  const code = route.query.code as string
  if (code) {
    await handleOAuthCallback(code)
  }
})

const toggleMode = () => {
  isLogin.value = !isLogin.value
  // 清空表單和錯誤
  form.email = ''
  form.password = ''
  form.confirmPassword = ''
  form.name = ''
  emailError.value = ''
  passwordError.value = ''
  confirmPasswordError.value = ''
  nameError.value = ''
}

const validateForm = () => {
  let isValid = true

  emailError.value = ''
  passwordError.value = ''
  confirmPasswordError.value = ''
  nameError.value = ''

  if (!form.email) {
    emailError.value = '請輸入電子郵件'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    emailError.value = '請輸入有效的電子郵件'
    isValid = false
  }

  if (!form.password) {
    passwordError.value = '請輸入密碼'
    isValid = false
  }

  if (!isLogin.value) {
    if (!form.confirmPassword) {
      confirmPasswordError.value = '請確認密碼'
      isValid = false
    } else if (form.password !== form.confirmPassword) {
      confirmPasswordError.value = '密碼不一致'
      isValid = false
    }

    if (!form.name) {
      nameError.value = '請輸入姓名'
      isValid = false
    }
  }

  return isValid
}

const handleGoogleLogin = () => {
  googleLoading.value = true
  try {
    // 暫時使用 Google OAuth URL，實際應該從後端獲取
    const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=your-client-id&redirect_uri=http://localhost:3000/auth&response_type=code&scope=email profile'
    window.location.href = authUrl
  } catch (error) {
    console.error('Google 登入失敗:', error)
    alert('Google 登入失敗，請重試')
  } finally {
    googleLoading.value = false
  }
}

const handleOAuthCallback = async (code: string) => {
  googleLoading.value = true
  try {
    // 這裡應該調用後端 API 來處理 OAuth 回調
    // 暫時使用模擬數據
    await new Promise(resolve => setTimeout(resolve, 1000)) // 模擬 API 調用
    console.log('OAuth code received:', code)

    alert('Google 登入成功！')

    // 清除 URL 中的 code 參數
    router.replace('/auth')

    // 跳轉到儀表板
    router.push('/dashboard')
  } catch (error) {
    console.error('OAuth callback error:', error)
    alert('登入失敗，請重試')
  } finally {
    googleLoading.value = false
  }
}

const handleSubmit = async (e: Event) => {
  e.preventDefault()

  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    if (isLogin.value) {
      // 模擬登入 API 調用
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('登入:', { email: form.email, password: form.password })

      alert('登入成功！')
      router.push('/dashboard')
    } else {
      // 模擬註冊 API 調用
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('註冊:', { email: form.email, password: form.password, name: form.name })

      alert('註冊成功！')
      isLogin.value = true
    }
  } catch (error) {
    console.error('認證錯誤:', error)
    alert('操作失敗，請重試')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h2 class="auth-title">{{ isLogin ? '登入' : '註冊' }}</h2>
          <p class="auth-subtitle">歡迎來到 3dw 自主學習平台</p>
          <p class="auth-subtitle-small">使用去中心化身份登入</p>
        </div>

        <!-- Google 登入按鈕 -->
        <div class="google-login-section">
          <button @click="handleGoogleLogin" class="ui button google-btn disabled" :class="{ loading: googleLoading }"
            :disabled="googleLoading">
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" class="google-icon" />
            <span class="google-text">使用 Google 登入</span>
          </button>
        </div>

        <div class="divider">
          <span>或</span>
        </div>

        <form @submit="handleSubmit" class="ui form auth-form">
          <div class="field" :class="{ error: emailError }">
            <label>電子郵件</label>
            <input v-model="form.email" type="email" placeholder="請輸入電子郵件" :class="{ error: emailError }" />
            <div v-if="emailError" class="ui pointing red basic label">
              {{ emailError }}
            </div>
          </div>

          <div class="field" :class="{ error: passwordError }">
            <label>密碼</label>
            <input v-model="form.password" type="password" placeholder="請輸入密碼" :class="{ error: passwordError }" />
            <div v-if="passwordError" class="ui pointing red basic label">
              {{ passwordError }}
            </div>
          </div>

          <div v-if="!isLogin" class="field" :class="{ error: confirmPasswordError }">
            <label>確認密碼</label>
            <input v-model="form.confirmPassword" type="password" placeholder="請確認密碼"
              :class="{ error: confirmPasswordError }" />
            <div v-if="confirmPasswordError" class="ui pointing red basic label">
              {{ confirmPasswordError }}
            </div>
          </div>

          <div v-if="!isLogin" class="field" :class="{ error: nameError }">
            <label>姓名</label>
            <input v-model="form.name" type="text" placeholder="請輸入姓名" :class="{ error: nameError }" />
            <div v-if="nameError" class="ui pointing red basic label">
              {{ nameError }}
            </div>
          </div>

          <button type="submit" class="ui primary button submit-btn" :class="{ loading: loading }" :disabled="loading">
            {{ isLogin ? '登入' : '註冊' }}
          </button>
        </form>

        <div class="auth-footer">
          <p>
            {{ isLogin ? '還沒有帳號？' : '已有帳號？' }}
            <a @click="toggleMode" class="toggle-link">
              {{ isLogin ? '立即註冊' : '立即登入' }}
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.auth-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.auth-card {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: none !important;
}

.auth-header {
  text-align: center;
  margin-bottom: 30px;
}

.auth-title {
  font-size: 34px; /* 從 28px 增加到 34px */
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.auth-subtitle {
  color: #666;
  font-size: 19px; /* 從 16px 增加到 19px */
  margin-bottom: 4px;
}

.auth-subtitle-small {
  color: #888;
  font-size: 17px; /* 從 14px 增加到 17px */
}

.google-login-section {
  margin-bottom: 20px;
}

.google-btn {
  width: 100%;
  height: 56px; /* 從 48px 增加到 56px */
  font-size: 19px; /* 從 16px 增加到 19px */
  font-weight: 500;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.google-icon {
  width: 18px;
  height: 18px;
}

.google-text {
  margin-left: 8px;
}

.divider {
  text-align: center;
  margin: 20px 0;
  position: relative;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #ddd;
}

.divider span {
  background: white;
  padding: 0 16px;
  color: #666;
  font-size: 14px;
  position: relative;
}

.auth-form {
  margin-bottom: 20px;
}

.field {
  margin-bottom: 20px;
}

.submit-btn {
  width: 100%;
  height: 56px; /* 從 48px 增加到 56px */
  font-size: 19px; /* 從 16px 增加到 19px */
  font-weight: 500;
  margin-top: 10px;
}

.auth-footer {
  text-align: center;
  color: #666;
  margin-top: 20px;
}

.toggle-link {
  color: #667eea;
  cursor: pointer;
  text-decoration: none;
}

.toggle-link:hover {
  text-decoration: underline;
}
</style>
