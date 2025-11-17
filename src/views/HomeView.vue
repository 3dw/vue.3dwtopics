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
            <div class="martial-arts-icon">
              <i class="fist raised icon"></i>
            </div>
            <h1 class="martial-arts-title">
              武林高手修煉場
            </h1>
            <p class="ui large text" style="color: rgba(255,255,255,0.9); font-size: 1.2rem;">
              「自主學習促進會」中，聚集了許多來自各方的武林高手，也將會陸續發現更多潛藏的高手。
            </p>

            <div class="wisdom-quote">
              "當我看著眼前一小塊土地，看到植物以及...<br>
              萬物皆有靈 vs. 人在期間的自我節律"
              <div style="text-align: right; margin-top: 1rem; font-size: 0.9rem; color: #fbbf24;">
                — 思琴
              </div>
            </div>

            <div class="ui buttons">
              <RouterLink to="/dashboard" class="ui large positive button">
                <i class="play icon"></i>
                開始修煉
              </RouterLink>
              <button class="ui large primary button">探索高手</button>
              <button class="ui large secondary button">了解更多</button>
            </div>
          </div>
          <div class="column">
            <div
              style="width: 100%; height: 350px; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.3);">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/ZPzqw3x05-g?si=UiTeuNnMgaQu2G5G"
                title="3dw 武林高手修煉場介紹" frameborder="0"
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

    <!-- 武林高手介紹 -->
    <div class="master-section">
      <div class="ui container">
        <h2 class="ui center aligned header" style="color: #1e293b; font-size: 2.5rem; margin-bottom: 3rem;">
          <i class="fist raised icon" style="color: #3b82f6;"></i>
          武林高手風采
        </h2>

        <div class="ui two column stackable grid">
          <div class="column">
            <div class="master-card">
              <div class="master-avatar">
                <i class="leaf icon"></i>
              </div>
              <h3 class="ui center aligned header" style="color: #1e40af;">思琴</h3>
              <p style="color: #475569; line-height: 1.6;">
                專精於生態觀察與自主學習哲學。透過對小塊土地的深度觀察，
                探索區域生態到植物群落的奧秘，理解入侵種在期間的意義，
                培養生態倫理與自我節律的平衡。
              </p>
              <div class="ui divider" style="background-color: #e2e8f0;"></div>
              <h4 style="color: #3b82f6; margin-top: 1rem;">修煉心法：</h4>
              <ul style="color: #64748b;">
                <li>辨識與標註的藝術</li>
                <li>採集前後的思考原則</li>
                <li>萬物皆有靈的哲學</li>
                <li>自我節律的修煉</li>
              </ul>
            </div>
          </div>

          <div class="column">
            <div class="master-card">
              <div class="master-avatar">
                <i class="tree icon"></i>
              </div>
              <h3 class="ui center aligned header" style="color: #1e40af;">Friday</h3>
              <p style="color: #475569; line-height: 1.6;">
                野外可食植物辨識的專家，傳授安全採集原則與生態倫理觀念。
                教導學習者如何在小塊土地上觀察植物群落與生態系統，
                建立人與自然的和諧關係。
              </p>
              <div class="ui divider" style="background-color: #e2e8f0;"></div>
              <h4 style="color: #3b82f6; margin-top: 1rem;">修煉心法：</h4>
              <ul style="color: #64748b;">
                <li>植物辨識的基礎</li>
                <li>安全採集的原則</li>
                <li>生態倫理的實踐</li>
                <li>人與自然的和諧</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 修煉路徑 -->
    <div class="learning-path">
      <div class="ui container">
        <h2 class="ui center aligned header" style="font-size: 2.5rem; margin-bottom: 3rem; color: #1e293b;">
          <i class="route icon" style="color: #3b82f6;"></i>
          修煉路徑
        </h2>

        <div class="ui three column stackable grid">
          <div class="column">
            <div class="path-step">
              <div class="step-number">1</div>
              <h3 class="ui header">區域生態觀察</h3>
              <p>當我看著眼前一小塊土地，看到植物以及...</p>
              <ul>
                <li>從區域生態到植物群落</li>
                <li>入侵種在期間的意義</li>
                <li>物理性觀察對應到內在的時間、空間</li>
              </ul>
            </div>
          </div>

          <div class="column">
            <div class="path-step">
              <div class="step-number">2</div>
              <h3 class="ui header">辨識與標註</h3>
              <p>哪些開放（公民共享）工具，可以協助我做到...</p>
              <ul>
                <li>植物辨識技巧</li>
                <li>生態標註方法</li>
                <li>公民共享工具使用</li>
              </ul>
            </div>
          </div>

          <div class="column">
            <div class="path-step">
              <div class="step-number">3</div>
              <h3 class="ui header">採集與思考</h3>
              <p>當我採集以前、採集時跟採集以後，（為何）需要思考哪些原則？</p>
              <ul>
                <li>採集前的準備</li>
                <li>採集時的原則</li>
                <li>採集後的反思</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 哲學思考 -->
    <div class="philosophy-section">
      <div class="ui container">
        <h2 class="ui center aligned header" style="font-size: 2.5rem; margin-bottom: 3rem; color: #1e293b;">
          <i class="lightbulb icon" style="color: #3b82f6;"></i>
          修煉哲學
        </h2>

        <div class="ui two column stackable grid">
          <div class="column">
            <div class="philosophy-card">
              <h3 class="philosophy-title">
                <i class="leaf icon" style="color: #3b82f6;"></i>
                萬物皆有靈
              </h3>
              <p style="line-height: 1.6;">
                當我們深入觀察自然時，會發現每一種植物、每一個生態系統都有其獨特的生命力。
                這種觀察幫助我們理解生態倫理與公私有土地的關係，培養對自然的敬畏之心。
              </p>
            </div>
          </div>

          <div class="column">
            <div class="philosophy-card">
              <h3 class="philosophy-title">
                <i class="heart icon" style="color: #3b82f6;"></i>
                自我節律
              </h3>
              <p style="line-height: 1.6;">
                在觀察自然的過程中，我們也在觀察自己。通過與自然的互動，
                我們學會調整自己的節奏，找到內在的平衡，實現人與自然的和諧共處。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 修煉主題 -->
    <div class="ui container" style="padding: 80px 0;">
      <h2 class="ui center aligned header" style="font-size: 2.5rem; margin-bottom: 3rem; color: #1e293b;">
        <i class="star icon" style="color: #3b82f6;"></i>
        修煉主題
      </h2>
      <div class="ui three column stackable grid">
        <div class="column">
          <div class="ui fluid card topic-card">
            <div class="topic-header">
              <h3 style="color: white; margin: 0;">野外可食植物辨識</h3>
            </div>
            <div class="content">
              <div class="meta">
                <span class="date">適合所有程度</span>
              </div>
              <div class="description">
                學習辨識野地可食植物，掌握安全採集原則與生態倫理，建立人與自然的和諧關係
              </div>
            </div>
            <div class="extra content">
              <div class="ui two buttons">
                <button class="ui basic button">查看詳情</button>
                <RouterLink to="/dashboard" class="ui primary button">開始修煉</RouterLink>
              </div>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="ui fluid card topic-card">
            <div class="topic-header">
              <h3 style="color: white; margin: 0;">地景生態觀察</h3>
            </div>
            <div class="content">
              <div class="meta">
                <span class="date">適合所有程度</span>
              </div>
              <div class="description">
                探索區域生態與植物群落，理解入侵種意義，培養生態倫理與自我節律
              </div>
            </div>
            <div class="extra content">
              <div class="ui two buttons">
                <button class="ui basic button">查看詳情</button>
                <RouterLink to="/dashboard" class="ui primary button">開始修煉</RouterLink>
              </div>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="ui fluid card topic-card">
            <div class="topic-header">
              <h3 style="color: white; margin: 0;">生態記錄與分享</h3>
            </div>
            <div class="content">
              <div class="meta">
                <span class="date">適合所有程度</span>
              </div>
              <div class="description">
                學習使用公民共享工具記錄生態觀察，分享個人自主提案與實作經驗
              </div>
            </div>
            <div class="extra content">
              <div class="ui two buttons">
                <button class="ui basic button">查看詳情</button>
                <RouterLink to="/dashboard" class="ui primary button">開始修煉</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 其他修煉主題 -->
      <div class="ui container" style="padding: 60px 0;">
        <h2 class="ui center aligned header" style="font-size: 2.5rem; margin-bottom: 3rem; color: #1e293b;">
          <i class="book icon" style="color: #3b82f6;"></i>
          其他修煉主題
        </h2>
        <div class="ui three column stackable grid">
          <!-- 第一列：思辨主題、數學主題、打毛線主題 -->
          <div class="column">
            <div class="ui fluid card topic-card">
              <div class="image">
                <div
                  style="height: 200px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center;">
                  <i class="huge lightbulb icon" style="color: white; font-size: 4em;"></i>
                </div>
              </div>
              <div class="content">
                <div class="header">思辨主題</div>
                <div class="meta">
                  <span class="date">適合所有程度</span>
                </div>
                <div class="description">
                  培養批判性思維，學習邏輯推理與論證技巧，提升問題分析與解決能力
                </div>
              </div>
              <div class="extra content">
                <div class="ui two buttons">
                  <button class="ui basic button">查看詳情</button>
                  <RouterLink to="/dashboard" class="ui primary button">開始修煉</RouterLink>
                </div>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="ui fluid card topic-card">
              <div class="image">
                <div
                  style="height: 200px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); display: flex; align-items: center; justify-content: center;">
                  <i class="huge calculator icon" style="color: white; font-size: 4em;"></i>
                </div>
              </div>
              <div class="content">
                <div class="header">數學主題</div>
                <div class="meta">
                  <span class="date">適合所有程度</span>
                </div>
                <div class="description">
                  探索數學的奧秘，從基礎運算到高等數學，培養邏輯思維與抽象思考能力
                </div>
              </div>
              <div class="extra content">
                <div class="ui two buttons">
                  <button class="ui basic button">查看詳情</button>
                  <RouterLink to="/dashboard" class="ui primary button">開始修煉</RouterLink>
                </div>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="ui fluid card topic-card">
              <div class="image">
                <div
                  style="height: 200px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); display: flex; align-items: center; justify-content: center;">
                  <i class="huge cut icon" style="color: white; font-size: 4em;"></i>
                </div>
              </div>
              <div class="content">
                <div class="header">打毛線主題</div>
                <div class="meta">
                  <span class="date">適合所有程度</span>
                </div>
                <div class="description">
                  學習編織技巧，從基礎針法到複雜圖案，培養耐心與創造力
                </div>
              </div>
              <div class="extra content">
                <div class="ui two buttons">
                  <button class="ui basic button">查看詳情</button>
                  <RouterLink to="/dashboard" class="ui primary button">開始修煉</RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 第二列：寫作主題、公共參與主題、自學煩惱主題 -->
        <div class="ui three column stackable grid" style="margin-top: 2rem;">
          <div class="column">
            <div class="ui fluid card topic-card">
              <div class="image">
                <div
                  style="height: 200px; background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); display: flex; align-items: center; justify-content: center;">
                  <i class="huge edit icon" style="color: white; font-size: 4em;"></i>
                </div>
              </div>
              <div class="content">
                <div class="header">寫作主題</div>
                <div class="meta">
                  <span class="date">適合所有程度</span>
                </div>
                <div class="description">
                  提升寫作技巧，從創意寫作到學術寫作，培養表達能力與文學素養
                </div>
              </div>
              <div class="extra content">
                <div class="ui two buttons">
                  <button class="ui basic button">查看詳情</button>
                  <RouterLink to="/dashboard" class="ui primary button">開始修煉</RouterLink>
                </div>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="ui fluid card topic-card">
              <div class="image">
                <div
                  style="height: 200px; background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); display: flex; align-items: center; justify-content: center;">
                  <i class="huge users icon" style="color: white; font-size: 4em;"></i>
                </div>
              </div>
              <div class="content">
                <div class="header">公共參與主題</div>
                <div class="meta">
                  <span class="date">適合所有程度</span>
                </div>
                <div class="description">
                  學習公民參與與社會責任，培養民主素養與公共事務參與能力
                </div>
              </div>
              <div class="extra content">
                <div class="ui two buttons">
                  <button class="ui basic button">查看詳情</button>
                  <RouterLink to="/dashboard" class="ui primary button">開始修煉</RouterLink>
                </div>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="ui fluid card topic-card">
              <div class="image">
                <div
                  style="height: 200px; background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); display: flex; align-items: center; justify-content: center;">
                  <i class="huge help circle icon" style="color: white; font-size: 4em;"></i>
                </div>
              </div>
              <div class="content">
                <div class="header">自學煩惱主題</div>
                <div class="meta">
                  <span class="date">適合所有程度</span>
                </div>
                <div class="description">
                  解決自學過程中的困難與疑惑，分享經驗與方法，建立學習支持系統
                </div>
              </div>
              <div class="extra content">
                <div class="ui two buttons">
                  <button class="ui basic button">查看詳情</button>
                  <RouterLink to="/dashboard" class="ui primary button">開始修煉</RouterLink>
                </div>
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
            <h4 class="ui header" style="color: #fbbf24;">關於 3dw 武林高手</h4>
            <p style="color: rgba(255,255,255,0.9);">
              致力於推廣自主學習，透過個人自主提案與實作，建立人與萬事萬物和諧關係。
              我們有很多武林高手，也會陸續發覺很多武林高手。
            </p>
          </div>
          <div class="column">
            <h4 class="ui header" style="color: #fbbf24;">修煉資源</h4>
            <div class="ui list" style="color: rgba(255,255,255,0.9);">
              <div class="item">修煉目錄</div>
              <div class="item">修煉指南</div>
              <div class="item">FAQ</div>
              <div class="item">聯絡我們</div>
            </div>
          </div>
          <div class="column">
            <h4 class="ui header" style="color: #fbbf24;">武林社群</h4>
            <div class="ui list" style="color: rgba(255,255,255,0.9);">
              <div class="item">討論區</div>
              <div class="item">修煉群組</div>
              <div class="item">活動資訊</div>
              <div class="item">志工招募</div>
            </div>
          </div>
          <div class="column">
            <h4 class="ui header" style="color: #fbbf24;">武林語錄</h4>
            <p style="color: rgba(255,255,255,0.9); font-style: italic;">
              "當我看著眼前一小塊土地，看到植物以及...<br>
              萬物皆有靈 vs. 人在期間的自我節律"
            </p>
          </div>
        </div>
        <div class="ui divider" style="background-color: rgba(255,255,255,0.2);"></div>
        <div class="ui center aligned text" style="color: rgba(255,255,255,0.6);">
          © 2025 3dw 武林高手 - 自主學習促進會. 保留所有權利.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 政府網站風格：簡潔、專業、清晰 */
.hero-section {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e40af 100%);
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

.martial-arts-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.wisdom-quote {
  font-size: 1.1rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.95);
  margin: 2rem 0;
  padding: 1.5rem;
  border-left: 4px solid #fbbf24;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0 8px 8px 0;
  backdrop-filter: blur(10px);
}

.master-section {
  background: #f8fafc;
  color: #1e293b;
  padding: 80px 0;
  border-top: 4px solid #3b82f6;
}

.master-card {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 2rem;
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.master-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
  border-color: #3b82f6;
}

.master-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 2rem;
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
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
  border-left: 4px solid #3b82f6;
  transition: all 0.3s ease;
}

.path-step:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.12);
  border-color: #3b82f6;
}

.step-number {
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
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
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
  border-color: #3b82f6;
}

.topic-header {
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  color: white;
  padding: 1.5rem;
  text-align: center;
  font-weight: 600;
}

.footer {
  background: #1e293b;
  color: white;
  padding: 60px 0 40px;
  border-top: 4px solid #3b82f6;
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

.martial-arts-icon {
  font-size: 3rem;
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
  border-top: 4px solid #3b82f6;
  transition: all 0.3s ease;
}

.philosophy-card:hover {
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.12);
  border-color: #3b82f6;
}

.philosophy-title {
  color: #1e293b;
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

/* 按鈕樣式優化 - 政府網站風格 */
.hero-section .ui.button {
  font-weight: 600;
  padding: 0.9rem 2rem;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.hero-section .ui.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.hero-section .ui.positive.button {
  background: #10b981;
  border-color: #10b981;
}

.hero-section .ui.positive.button:hover {
  background: #059669;
  border-color: #059669;
}

.hero-section .ui.primary.button {
  background: #3b82f6;
  border-color: #3b82f6;
}

.hero-section .ui.primary.button:hover {
  background: #2563eb;
  border-color: #2563eb;
}

/* 手機版樣式調整 */
@media only screen and (max-width: 768px) {

  /* 減少上方空白 */
  .hero-section {
    padding: 80px 0 60px;
    margin-top: 0;
  }

  .martial-arts-title {
    font-size: 2.2rem;
    margin-top: 0;
  }

  .hero-section .ui.button {
    padding: 0.8rem 1.5rem;
    font-size: 0.95rem;
  }
}
</style>
