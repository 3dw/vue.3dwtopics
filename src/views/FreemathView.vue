<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

onMounted(() => {
  // 平滑滾動效果
  const links = document.querySelectorAll('a[href^="#"]')
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href')
      if (href && href !== '#') {
        const target = document.querySelector(href)
        if (target) {
          e.preventDefault()
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    })
  })
})
</script>

<template>
  <div>
    <!-- 主要橫幅 -->
    <div class="hero-section">
      <div class="ui container hero-content">
        <div class="ui two column stackable grid">
          <div class="column">
            <div class="math-icon">
              <i class="calculator icon"></i>
            </div>
            <h1 class="math-title">
              自由數學學習平台
            </h1>
            <p class="ui large text" style="color: rgba(255,255,255,0.9); font-size: 1.2rem;">
              探索數學的奧秘，從基礎運算到高等數學，培養邏輯思維與抽象思考能力。
              讓數學成為你探索世界的工具，而非束縛。
            </p>

            <div class="wisdom-quote">
              "數學不是計算，而是思考的方式<br>
              透過數學，我們可以理解世界的規律與美感"
              <div style="text-align: right; margin-top: 1rem; font-size: 0.9rem; color: #fbbf24;">
                — Bestian Tang（小巴老師）
              </div>
            </div>

            <div class="ui buttons">
              <RouterLink to="/courses" class="ui large positive button">
                <i class="play icon"></i>
                開始學習
              </RouterLink>
              <a href="https://math.alearn.org.tw/" target="_blank" class="ui large primary button">
                <i class="external icon"></i>
                探索更多
              </a>
              <a href="https://www.youtube.com/channel/UCTdF4XJ1zhJcGL6CAMImItg" target="_blank" class="ui large secondary button">
                <i class="youtube icon"></i>
                觀看影片
              </a>
            </div>
          </div>
          <div class="column">
            <div
              style="width: 100%; height: 350px; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.3);">
              <iframe width="100%" height="100%" 
                src="https://www.youtube.com/embed/videoseries?list=PLrDesaqSWN8yY0WtUOvinmbxh5Pd3sL1U"
                title="Bestian Tang 小巴老師數學教學頻道" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen>
              </iframe>
            </div>
          </div>
        </div>

        <div class="scroll-indicator">
          <i class="chevron down icon" style="color: rgba(255,255,255,0.9); font-size: 2rem;"></i>
        </div>
      </div>
    </div>

    <!-- 小巴老師介紹 -->
    <div class="teacher-section">
      <div class="ui container">
        <h2 class="ui center aligned header" style="color: #1e293b; font-size: 2.5rem; margin-bottom: 3rem;">
          <i class="user circle icon" style="color: #f5576c;"></i>
          關於 Bestian Tang（小巴老師）
        </h2>

        <div class="ui two column stackable grid">
          <div class="column">
            <div class="teacher-card">
              <div class="teacher-avatar">
                <i class="user graduate icon"></i>
              </div>
              <h3 class="ui center aligned header" style="color: #1e40af;">Bestian Tang</h3>
              <p class="ui center aligned" style="color: #f5576c; font-weight: 600; margin-bottom: 1rem;">小巴老師</p>
              <p style="color: #475569; line-height: 1.6;">
                專精於數學教育與自主學習推廣。致力於打破傳統數學教學的框架，
                讓學習者能夠以自由、開放的方式探索數學的奧秘。
                透過實際問題解決與邏輯思考，培養學習者的數學思維能力。
              </p>
              <div class="ui divider" style="background-color: #e2e8f0;"></div>
              <h4 style="color: #f5576c; margin-top: 1rem;">教學特色：</h4>
              <ul style="color: #64748b;">
                <li>自由探索的學習方式</li>
                <li>從問題出發的教學法</li>
                <li>邏輯思維的培養</li>
                <li>數學美感的啟發</li>
              </ul>
              <div class="ui divider" style="background-color: #e2e8f0; margin-top: 1rem;"></div>
              <div style="margin-top: 1rem;">
                <a href="https://math.alearn.org.tw/" target="_blank" class="ui button" style="background: #f5576c; color: white;">
                  <i class="external icon"></i>
                  訪問數學學習平台
                </a>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="teacher-card">
              <div class="teacher-avatar" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                <i class="book icon"></i>
              </div>
              <h3 class="ui center aligned header" style="color: #1e40af;">教學理念</h3>
              <p style="color: #475569; line-height: 1.6;">
                數學不應該只是公式和計算，而是一種思考世界的方式。
                小巴老師相信每個人都可以透過適合自己的方式學習數學，
                從實際問題出發，培養邏輯思維與抽象思考能力。
              </p>
              <div class="ui divider" style="background-color: #e2e8f0;"></div>
              <h4 style="color: #f5576c; margin-top: 1rem;">核心價值：</h4>
              <ul style="color: #64748b;">
                <li>自由探索的學習環境</li>
                <li>問題導向的教學方法</li>
                <li>邏輯思維的系統培養</li>
                <li>數學美感的深度體驗</li>
              </ul>
              <div class="ui divider" style="background-color: #e2e8f0; margin-top: 1rem;"></div>
              <div style="margin-top: 1rem;">
                <a href="https://www.youtube.com/channel/UCTdF4XJ1zhJcGL6CAMImItg" target="_blank" class="ui button" style="background: #f5576c; color: white;">
                  <i class="youtube icon"></i>
                  觀看 YouTube 頻道
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 學習路徑 -->
    <div class="learning-path">
      <div class="ui container">
        <h2 class="ui center aligned header" style="font-size: 2.5rem; margin-bottom: 3rem; color: #1e293b;">
          <i class="route icon" style="color: #f5576c;"></i>
          數學學習路徑
        </h2>

        <div class="ui three column stackable grid">
          <div class="column">
            <div class="path-step">
              <div class="step-number">1</div>
              <h3 class="ui header">基礎概念建立</h3>
              <p>從實際問題出發，建立數學基礎概念</p>
              <ul>
                <li>數與運算的理解</li>
                <li>幾何圖形的探索</li>
                <li>邏輯推理的培養</li>
              </ul>
            </div>
          </div>

          <div class="column">
            <div class="path-step">
              <div class="step-number">2</div>
              <h3 class="ui header">問題解決能力</h3>
              <p>透過實際問題，培養數學思維與解決能力</p>
              <ul>
                <li>問題分析與拆解</li>
                <li>多種解法的探索</li>
                <li>邏輯驗證與反思</li>
              </ul>
            </div>
          </div>

          <div class="column">
            <div class="path-step">
              <div class="step-number">3</div>
              <h3 class="ui header">抽象思考與美感</h3>
              <p>深入理解數學的抽象本質與內在美感</p>
              <ul>
                <li>抽象概念的建立</li>
                <li>數學結構的探索</li>
                <li>數學美感的體驗</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 教學哲學 -->
    <div class="philosophy-section">
      <div class="ui container">
        <h2 class="ui center aligned header" style="font-size: 2.5rem; margin-bottom: 3rem; color: #1e293b;">
          <i class="lightbulb icon" style="color: #f5576c;"></i>
          教學哲學
        </h2>

        <div class="ui two column stackable grid">
          <div class="column">
            <div class="philosophy-card">
              <h3 class="philosophy-title">
                <i class="calculator icon" style="color: #f5576c;"></i>
                自由探索
              </h3>
              <p style="line-height: 1.6;">
                數學學習不應該被框架限制。我們鼓勵學習者以自己的步調和方式探索數學，
                從感興趣的問題出發，逐步建立數學思維與解決問題的能力。
              </p>
            </div>
          </div>

          <div class="column">
            <div class="philosophy-card">
              <h3 class="philosophy-title">
                <i class="puzzle piece icon" style="color: #f5576c;"></i>
                邏輯思維
              </h3>
              <p style="line-height: 1.6;">
                數學是培養邏輯思維的最佳工具。透過系統性的思考訓練，
                我們幫助學習者建立清晰的邏輯架構，提升分析問題與解決問題的能力。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 學習主題 -->
    <div class="ui container" style="padding: 80px 0;">
      <h2 class="ui center aligned header" style="font-size: 2.5rem; margin-bottom: 3rem; color: #1e293b;">
        <i class="star icon" style="color: #f5576c;"></i>
        數學學習主題
      </h2>
      <div class="ui three column stackable grid">
        <div class="column">
          <div class="ui fluid card topic-card">
            <div class="topic-header" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
              <h3 style="color: white; margin: 0;">基礎數學</h3>
            </div>
            <div class="content">
              <div class="meta">
                <span class="date">適合初學者</span>
              </div>
              <div class="description">
                從數與運算開始，建立穩固的數學基礎，培養對數學的興趣與信心
              </div>
            </div>
            <div class="extra content">
              <div class="ui two buttons">
                <button class="ui basic button">查看詳情</button>
                <RouterLink to="/courses" class="ui primary button">開始學習</RouterLink>
              </div>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="ui fluid card topic-card">
            <div class="topic-header" style="background: linear-gradient(135deg, #f5576c 0%, #f093fb 100%);">
              <h3 style="color: white; margin: 0;">幾何與空間</h3>
            </div>
            <div class="content">
              <div class="meta">
                <span class="date">適合所有程度</span>
              </div>
              <div class="description">
                探索幾何圖形的奧秘，理解空間關係，培養視覺化思考能力
              </div>
            </div>
            <div class="extra content">
              <div class="ui two buttons">
                <button class="ui basic button">查看詳情</button>
                <RouterLink to="/courses" class="ui primary button">開始學習</RouterLink>
              </div>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="ui fluid card topic-card">
            <div class="topic-header" style="background: linear-gradient(135deg, #f5576c 0%, #f093fb 100%);">
              <h3 style="color: white; margin: 0;">代數與函數</h3>
            </div>
            <div class="content">
              <div class="meta">
                <span class="date">適合進階學習者</span>
              </div>
              <div class="description">
                深入理解代數結構與函數關係，培養抽象思考與邏輯推理能力
              </div>
            </div>
            <div class="extra content">
              <div class="ui two buttons">
                <button class="ui basic button">查看詳情</button>
                <RouterLink to="/courses" class="ui primary button">開始學習</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 頁腳 -->
    <div class="footer">
      <div class="ui container">
        <div class="ui four column stackable grid">
          <div class="column">
            <h4 class="ui header" style="color: #fbbf24;">關於自由數學</h4>
            <p style="color: rgba(255,255,255,0.9);">
              致力於推廣自由、開放的數學學習方式，讓每個人都能以自己的方式探索數學的奧秘。
              透過問題導向的教學，培養邏輯思維與抽象思考能力。
            </p>
          </div>
          <div class="column">
            <h4 class="ui header" style="color: #fbbf24;">學習資源</h4>
            <div class="ui list" style="color: rgba(255,255,255,0.9);">
              <div class="item">
                <a href="https://math.alearn.org.tw/" target="_blank" style="color: rgba(255,255,255,0.9);">
                  數學學習平台
                </a>
              </div>
              <div class="item">
                <a href="https://www.youtube.com/channel/UCTdF4XJ1zhJcGL6CAMImItg" target="_blank" style="color: rgba(255,255,255,0.9);">
                  YouTube 頻道
                </a>
              </div>
              <div class="item">課程目錄</div>
              <div class="item">聯絡我們</div>
            </div>
          </div>
          <div class="column">
            <h4 class="ui header" style="color: #fbbf24;">學習社群</h4>
            <div class="ui list" style="color: rgba(255,255,255,0.9);">
              <div class="item">討論區</div>
              <div class="item">學習群組</div>
              <div class="item">活動資訊</div>
              <div class="item">志工招募</div>
            </div>
          </div>
          <div class="column">
            <h4 class="ui header" style="color: #fbbf24;">數學語錄</h4>
            <p style="color: rgba(255,255,255,0.9); font-style: italic;">
              "數學不是計算，而是思考的方式<br>
              透過數學，我們可以理解世界的規律與美感"
            </p>
            <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-top: 0.5rem;">
              — Bestian Tang（小巴老師）
            </p>
          </div>
        </div>
        <div class="ui divider" style="background-color: rgba(255,255,255,0.2);"></div>
        <div class="ui center aligned text" style="color: rgba(255,255,255,0.6);">
          © 2025 自由數學學習平台 - 自主學習促進會. 保留所有權利.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 數學主題風格：專業、清晰、富有創意 */
.hero-section {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #f093fb 100%);
  color: white;
  padding: 100px 0 60px;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(255, 255, 255, 0.03) 10px,
    rgba(255, 255, 255, 0.03) 20px
  );
  opacity: 0.5;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.math-title {
  font-size: 3.6rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.wisdom-quote {
  font-size: 1.3rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.95);
  margin: 2rem 0;
  padding: 1.5rem;
  border-left: 4px solid #fbbf24;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0 8px 8px 0;
  backdrop-filter: blur(10px);
}

.teacher-section {
  background: #f8fafc;
  color: #1e293b;
  padding: 80px 0;
  border-top: 4px solid #f5576c;
}

.teacher-card {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 2rem;
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.teacher-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 16px rgba(245, 87, 108, 0.15);
  border-color: #f5576c;
}

.teacher-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 2rem;
  color: white;
  box-shadow: 0 4px 12px rgba(245, 87, 108, 0.3);
}

.learning-path {
  background: white;
  padding: 80px 0;
  border-top: 1px solid #e2e8f0;
}

.path-step {
  background: #f8fafc;
  border-radius: 8px;
  padding: 2rem;
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 2px solid #e2e8f0;
  border-left: 4px solid #f5576c;
  transition: all 0.3s ease;
}

.path-step:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 16px rgba(245, 87, 108, 0.12);
  border-color: #f5576c;
}

.step-number {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(245, 87, 108, 0.3);
}

.topic-card {
  transition: all 0.3s ease;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.topic-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(245, 87, 108, 0.15);
  border-color: #f5576c;
}

.topic-header {
  color: white;
  padding: 1.5rem;
  text-align: center;
  font-weight: 600;
}

.footer {
  background: #1e293b;
  color: white;
  padding: 60px 0 40px;
  border-top: 4px solid #f5576c;
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
  color: rgba(255, 255, 255, 0.8);
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

.math-icon {
  font-size: 3.6rem;
  color: #fbbf24;
  margin-bottom: 1rem;
}

.philosophy-section {
  background: #f8fafc;
  padding: 80px 0;
  border-top: 1px solid #e2e8f0;
}

.philosophy-card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 2px solid #e2e8f0;
  border-top: 4px solid #f5576c;
  transition: all 0.3s ease;
}

.philosophy-card:hover {
  box-shadow: 0 4px 16px rgba(245, 87, 108, 0.12);
  border-color: #f5576c;
}

.philosophy-title {
  color: #1e293b;
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.8rem;
}

/* 按鈕樣式優化 */
.hero-section .ui.buttons {
  margin-top: 2.5rem !important;
  margin-bottom: 1rem !important;
  display: flex !important;
  gap: 1rem !important;
  flex-wrap: wrap;
  position: relative;
  z-index: 10;
}

.hero-section .ui.button {
  font-weight: 600 !important;
  padding: 1.1rem 2.4rem !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3) !important;
  transition: all 0.3s ease !important;
  font-size: 1.25rem !important;
  color: white !important;
  border: 2px solid transparent !important;
  position: relative;
  z-index: 10;
  min-height: 50px;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.hero-section .ui.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35) !important;
}

.hero-section .ui.positive.button {
  background: #10b981 !important;
  border-color: #10b981 !important;
  color: white !important;
}

.hero-section .ui.positive.button:hover {
  background: #059669 !important;
  border-color: #059669 !important;
  color: white !important;
}

.hero-section .ui.primary.button {
  background: #f5576c !important;
  border-color: #f5576c !important;
  color: white !important;
}

.hero-section .ui.primary.button:hover {
  background: #e63946 !important;
  border-color: #e63946 !important;
  color: white !important;
}

.hero-section .ui.secondary.button {
  background: rgba(255, 255, 255, 0.2) !important;
  border: 2px solid rgba(255, 255, 255, 0.5) !important;
  color: white !important;
  backdrop-filter: blur(10px);
}

.hero-section .ui.secondary.button:hover {
  background: rgba(255, 255, 255, 0.3) !important;
  border-color: rgba(255, 255, 255, 0.7) !important;
  color: white !important;
}

/* 手機版樣式調整 */
@media only screen and (max-width: 768px) {
  .hero-section {
    padding: 80px 0 60px;
    margin-top: 0;
  }

  .math-title {
    font-size: 2.6rem;
    margin-top: 0;
  }

  .hero-section .ui.button {
    padding: 0.8rem 1.5rem;
    font-size: 0.95rem;
  }
}
</style>

