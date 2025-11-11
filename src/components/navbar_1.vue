<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="ui fixed inverted menu" style="background: rgba(26,26,26,0.95); backdrop-filter: blur(10px);">
    <div class="ui container">
      <RouterLink to="/" class="header item">
        <i class="fist raised icon" style="color: #ffd700;"></i>
        <span style="color: #ffd700; font-weight: 600;">3dw 武林高手</span>
      </RouterLink>
      <a href="#" class="item">學習路徑</a>
      <a href="#" class="item">關於我們</a>
      <div class="right menu">
        <RouterLink to="/dashboard" class="ui positive button item start-practice-btn">
          <i class="play icon"></i>
          開始修煉
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 開始修煉按鈕顯眼樣式 */
.start-practice-btn {
  background: linear-gradient(135deg, #21ba45 0%, #16ab39 50%, #0f9e2e 100%) !important;
  border: 2px solid #ffd700 !important;
  box-shadow: 0 4px 15px rgba(33, 186, 69, 0.4), 0 0 20px rgba(255, 215, 0, 0.3) !important;
  color: white !important;
  font-weight: 700 !important;
  font-size: 1.1rem !important;
  padding: 0.8rem 1.5rem !important;
  border-radius: 25px !important;
  transition: all 0.3s ease !important;
  position: relative !important;
  overflow: hidden !important;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3) !important;
}

.start-practice-btn:hover {
  background: linear-gradient(135deg, #16ab39 0%, #0f9e2e 50%, #0a8c25 100%) !important;
  box-shadow: 0 6px 20px rgba(33, 186, 69, 0.6), 0 0 30px rgba(255, 215, 0, 0.5) !important;
  transform: translateY(-2px) !important;
  border-color: #ffed4e !important;
}

.start-practice-btn:active {
  transform: translateY(0) !important;
  box-shadow: 0 2px 10px rgba(33, 186, 69, 0.4) !important;
}

.start-practice-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.start-practice-btn:hover::before {
  left: 100%;
}

.start-practice-btn .icon {
  margin-right: 0.5rem !important;
  font-size: 1.1rem !important;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* 手機版樣式調整 */
@media only screen and (max-width: 768px) {
  /* 增加選單高度 */
  .ui.fixed.inverted.menu {
    min-height: 70px !important;
    padding: 0.8rem 0;
  }
  
  .ui.fixed.inverted.menu .item {
    padding: 0.8rem 1rem;
    font-size: 1rem;
  }
  
  /* 手機版按鈕調整 */
  .start-practice-btn {
    font-size: 1rem !important;
    padding: 0.7rem 1.2rem !important;
    border-radius: 20px !important;
  }
}
</style>

