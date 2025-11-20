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
            <div class="ecology-icon">
              <i class="leaf icon"></i>
            </div>
            <h1 class="ecology-title">
              野地植物生態觀察
            </h1>
            <p class="ui large text" style="color: rgba(255,255,255,0.9); font-size: 1.2rem;">
              透過對小塊土地的深度觀察，探索區域生態到植物群落的奧秘，
              理解入侵種在期間的意義，培養生態倫理與自我節律的平衡。
            </p>

            <div class="wisdom-quote">
              "當我看著眼前一小塊土地，看到植物以及...<br>
              萬物皆有靈 vs. 人在期間的自我節律"
              <div style="text-align: right; margin-top: 1rem; font-size: 0.9rem; color: #fbbf24;">
                — Friday
              </div>
            </div>

            <div class="ui buttons">
              <RouterLink to="/courses" class="ui large positive button">
                <i class="play icon"></i>
                開始觀察
              </RouterLink>
              <a href="https://taicol.tw/" target="_blank" class="ui large primary button">
                <i class="external icon"></i>
                台灣物種名錄
              </a>
              <a href="https://www.inaturalist.org/" target="_blank" class="ui large secondary button">
                <i class="search icon"></i>
                iNaturalist
              </a>
            </div>
          </div>
          <div class="column">
            <div
              style="width: 100%; height: 350px; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.3); background: linear-gradient(135deg, #10b981 0%, #059669 100%); display: flex; align-items: center; justify-content: center;">
              <i class="huge leaf icon" style="color: rgba(255,255,255,0.3); font-size: 8em;"></i>
            </div>
          </div>
        </div>

        <div class="scroll-indicator">
          <i class="chevron down icon" style="color: rgba(255,255,255,0.9); font-size: 2rem;"></i>
        </div>
      </div>
    </div>

    <!-- Friday 老師介紹 -->
    <div class="teacher-section">
      <div class="ui container">
        <h2 class="ui center aligned header" style="color: #1e293b; font-size: 2.5rem; margin-bottom: 3rem;">
          <i class="user circle icon" style="color: #10b981;"></i>
          關於 Friday 老師
        </h2>

        <div class="ui two column stackable grid">
          <div class="column">
            <div class="teacher-card">
              <div class="teacher-avatar">
                <i class="leaf icon"></i>
              </div>
              <h3 class="ui center aligned header" style="color: #1e40af;">Friday</h3>
              <p style="color: #475569; line-height: 1.6;">
                專精於生態觀察與自主學習哲學。透過對小塊土地的深度觀察，
                探索區域生態到植物群落的奧秘，理解入侵種在期間的意義，
                培養生態倫理與自我節律的平衡。
              </p>
              <div class="ui divider" style="background-color: #e2e8f0;"></div>
              <h4 style="color: #10b981; margin-top: 1rem;">觀察心法：</h4>
              <ul style="color: #64748b;">
                <li>辨識與標註的藝術</li>
                <li>採集前後的思考原則</li>
                <li>萬物皆有靈的哲學</li>
                <li>自我節律的修煉</li>
              </ul>
              <div class="ui divider" style="background-color: #e2e8f0; margin-top: 1rem;"></div>
              <div style="margin-top: 1rem;">
                <a href="https://taicol.tw/" target="_blank" class="ui button" style="background: #10b981; color: white;">
                  <i class="external icon"></i>
                  訪問台灣物種名錄
                </a>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="teacher-card">
              <div class="teacher-avatar" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
                <i class="globe icon"></i>
              </div>
              <h3 class="ui center aligned header" style="color: #1e40af;">觀察理念</h3>
              <p style="color: #475569; line-height: 1.6;">
                植物學家觀察植物，往往會擴展到地球科學。
                在不同環境區域的差異，植物代代繁衍下來會有適應環境的基因差異；
                因此，如果外地不同環境的同種植物移至本區，發生雜交，雜交後代，
                會有對本區環境適應基因的失漏。是故，一個氣候區域範圍內是原生種，
                但是任何另一個氣候區域的同一種植物仍是外來種。
              </p>
              <div class="ui divider" style="background-color: #e2e8f0;"></div>
              <h4 style="color: #10b981; margin-top: 1rem;">核心觀點：</h4>
              <ul style="color: #64748b;">
                <li>植物群落基因庫的區域適應性</li>
                <li>原生種與外來種的科學定義</li>
                <li>氣候區域與植物分佈的關係</li>
                <li>生態觀察與地球科學的連結</li>
              </ul>
              <div class="ui divider" style="background-color: #e2e8f0; margin-top: 1rem;"></div>
              <div style="margin-top: 1rem;">
                <a href="https://www.inaturalist.org/" target="_blank" class="ui button" style="background: #10b981; color: white;">
                  <i class="search icon"></i>
                  使用 iNaturalist
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 觀察路徑 -->
    <div class="learning-path">
      <div class="ui container">
        <h2 class="ui center aligned header" style="font-size: 2.5rem; margin-bottom: 3rem; color: #1e293b;">
          <i class="route icon" style="color: #10b981;"></i>
          植物辨識與觀察路徑
        </h2>

        <div class="ui three column stackable grid">
          <div class="column">
            <div class="path-step">
              <div class="step-number">1</div>
              <h3 class="ui header">初步辨識</h3>
              <p>使用 iNaturalist 或搜尋引擎比對推敲找出植物名稱的學名</p>
              <ul>
                <li>拍攝植物照片</li>
                <li>使用 iNaturalist 比對</li>
                <li>透過搜尋引擎查找</li>
                <li>確認植物學名</li>
              </ul>
            </div>
          </div>

          <div class="column">
            <div class="path-step">
              <div class="step-number">2</div>
              <h3 class="ui header">核對驗證</h3>
              <p>到台灣物種名錄核對照片，確認物種資訊與分類階層</p>
              <ul>
                <li>查詢台灣物種名錄</li>
                <li>核對照片與特徵</li>
                <li>查看分類階層資訊</li>
                <li>確認物種狀態標註</li>
              </ul>
            </div>
          </div>

          <div class="column">
            <div class="path-step">
              <div class="step-number">3</div>
              <h3 class="ui header">深度理解</h3>
              <p>理解植物生態、分佈與環境適應性，連結到地球科學</p>
              <ul>
                <li>了解原生/外來種定義</li>
                <li>理解氣候區域差異</li>
                <li>探索植物群落基因庫</li>
                <li>連結地球科學知識</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 觀察工具與資源 -->
    <div class="philosophy-section">
      <div class="ui container">
        <h2 class="ui center aligned header" style="font-size: 2.5rem; margin-bottom: 3rem; color: #1e293b;">
          <i class="tools icon" style="color: #10b981;"></i>
          觀察工具與資源
        </h2>

        <div class="ui two column stackable grid">
          <div class="column">
            <div class="philosophy-card">
              <h3 class="philosophy-title">
                <i class="search icon" style="color: #10b981;"></i>
                台灣物種名錄
              </h3>
              <p style="line-height: 1.6;">
                台灣物種名錄（Catalogue of Life in Taiwan）是國家資料庫，
                提供完整的物種資訊，包括照片、分類階層、物種狀態標註
                （是否為瀕臨危險、外來入侵或原生植物），以及分佈資訊。
                建議先用 iNaturalist 查學名，再到台灣物種名錄核對照片。
              </p>
              <div style="margin-top: 1rem;">
                <a href="https://taicol.tw/" target="_blank" class="ui button" style="background: #10b981; color: white;">
                  <i class="external icon"></i>
                  訪問台灣物種名錄
                </a>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="philosophy-card">
              <h3 class="philosophy-title">
                <i class="camera icon" style="color: #10b981;"></i>
                iNaturalist
              </h3>
              <p style="line-height: 1.6;">
                iNaturalist 是一個公民科學平台，可以透過上傳植物照片進行初步辨識。
                平台會提供可能的物種建議，幫助學習者找到植物的學名。
                這是植物辨識的第一步，之後再到台灣物種名錄進行核對驗證。
              </p>
              <div style="margin-top: 1rem;">
                <a href="https://www.inaturalist.org/" target="_blank" class="ui button" style="background: #10b981; color: white;">
                  <i class="external icon"></i>
                  訪問 iNaturalist
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="ui two column stackable grid" style="margin-top: 2rem;">
          <div class="column">
            <div class="philosophy-card">
              <h3 class="philosophy-title">
                <i class="globe icon" style="color: #10b981;"></i>
                TBIA 國際組織
              </h3>
              <p style="line-height: 1.6;">
                TBIA（Taiwan Biodiversity Information Facility）是國際組織，
                提供台灣生物多樣性資訊。可以比對不同系統平台列出的分佈資訊，
                幫助理解植物的地理分佈與生態環境。
              </p>
            </div>
          </div>

          <div class="column">
            <div class="philosophy-card">
              <h3 class="philosophy-title">
                <i class="info circle icon" style="color: #10b981;"></i>
                辨識注意事項
              </h3>
              <p style="line-height: 1.6;">
                同屬植物相似度高，在台灣物種名錄下相對完整。
                可以透過分類階層（界門綱目科屬）按右邊方塊（物種數），
                羅列出目前國家資料庫所有的該屬植物進行比對。
                目前平台尚有部份照片在整理中，所以可能無照片顯示。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 生態哲學 -->
    <div class="philosophy-section" style="background: white;">
      <div class="ui container">
        <h2 class="ui center aligned header" style="font-size: 2.5rem; margin-bottom: 3rem; color: #1e293b;">
          <i class="lightbulb icon" style="color: #10b981;"></i>
          生態觀察哲學
        </h2>

        <div class="ui two column stackable grid">
          <div class="column">
            <div class="philosophy-card">
              <h3 class="philosophy-title">
                <i class="leaf icon" style="color: #10b981;"></i>
                萬物皆有靈
              </h3>
              <p style="line-height: 1.6;">
                當我們深入觀察自然時，會發現每一種植物、每一個生態系統都有其獨特的生命力。
                這種觀察幫助我們理解生態倫理與公私有土地的關係，培養對自然的敬畏之心。
                透過對小塊土地的深度觀察，我們可以理解區域生態到植物群落的奧秘。
              </p>
            </div>
          </div>

          <div class="column">
            <div class="philosophy-card">
              <h3 class="philosophy-title">
                <i class="heart icon" style="color: #10b981;"></i>
                自我節律
              </h3>
              <p style="line-height: 1.6;">
                在觀察自然的過程中，我們也在觀察自己。通過與自然的互動，
                我們學會調整自己的節奏，找到內在的平衡，實現人與自然的和諧共處。
                理解入侵種在期間的意義，培養生態倫理與自我節律的平衡。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 學習主題 -->
    <div class="ui container" style="padding: 80px 0;">
      <h2 class="ui center aligned header" style="font-size: 2.5rem; margin-bottom: 3rem; color: #1e293b;">
        <i class="star icon" style="color: #10b981;"></i>
        生態觀察主題
      </h2>
      <div class="ui three column stackable grid">
        <div class="column">
          <div class="ui fluid card topic-card">
            <div class="topic-header" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
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
                <RouterLink to="/courses" class="ui primary button">開始觀察</RouterLink>
              </div>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="ui fluid card topic-card">
            <div class="topic-header" style="background: linear-gradient(135deg, #059669 0%, #047857 100%);">
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
                <RouterLink to="/courses" class="ui primary button">開始觀察</RouterLink>
              </div>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="ui fluid card topic-card">
            <div class="topic-header" style="background: linear-gradient(135deg, #047857 0%, #065f46 100%);">
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
                <RouterLink to="/courses" class="ui primary button">開始觀察</RouterLink>
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
            <h4 class="ui header" style="color: #fbbf24;">關於野地植物生態觀察</h4>
            <p style="color: rgba(255,255,255,0.9);">
              致力於推廣生態觀察與自主學習，透過對小塊土地的深度觀察，
              探索區域生態到植物群落的奧秘，理解入侵種在期間的意義，
              培養生態倫理與自我節律的平衡。
            </p>
          </div>
          <div class="column">
            <h4 class="ui header" style="color: #fbbf24;">觀察資源</h4>
            <div class="ui list" style="color: rgba(255,255,255,0.9);">
              <div class="item">
                <a href="https://taicol.tw/" target="_blank" style="color: rgba(255,255,255,0.9);">
                  台灣物種名錄
                </a>
              </div>
              <div class="item">
                <a href="https://www.inaturalist.org/" target="_blank" style="color: rgba(255,255,255,0.9);">
                  iNaturalist
                </a>
              </div>
              <div class="item">課程目錄</div>
              <div class="item">聯絡我們</div>
            </div>
          </div>
          <div class="column">
            <h4 class="ui header" style="color: #fbbf24;">觀察社群</h4>
            <div class="ui list" style="color: rgba(255,255,255,0.9);">
              <div class="item">討論區</div>
              <div class="item">觀察群組</div>
              <div class="item">活動資訊</div>
              <div class="item">志工招募</div>
            </div>
          </div>
          <div class="column">
            <h4 class="ui header" style="color: #fbbf24;">生態語錄</h4>
            <p style="color: rgba(255,255,255,0.9); font-style: italic;">
              "當我看著眼前一小塊土地，看到植物以及...<br>
              萬物皆有靈 vs. 人在期間的自我節律"
            </p>
            <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-top: 0.5rem;">
              — Friday
            </p>
          </div>
        </div>
        <div class="ui divider" style="background-color: rgba(255,255,255,0.2);"></div>
        <div class="ui center aligned text" style="color: rgba(255,255,255,0.6);">
          © 2025 野地植物生態觀察 - 自主學習促進會. 保留所有權利.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 生態觀察主題風格：自然、清新、專業 */
.hero-section {
  background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);
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

.ecology-title {
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
  border-top: 4px solid #10b981;
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
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.15);
  border-color: #10b981;
}

.teacher-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 2rem;
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
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
  border-left: 4px solid #10b981;
  transition: all 0.3s ease;
}

.path-step:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.12);
  border-color: #10b981;
}

.step-number {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
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
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.15);
  border-color: #10b981;
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
  border-top: 4px solid #10b981;
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

.ecology-icon {
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
  border-top: 4px solid #10b981;
  transition: all 0.3s ease;
}

.philosophy-card:hover {
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.12);
  border-color: #10b981;
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
  background: #059669 !important;
  border-color: #059669 !important;
  color: white !important;
}

.hero-section .ui.primary.button:hover {
  background: #047857 !important;
  border-color: #047857 !important;
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

  .ecology-title {
    font-size: 2.6rem;
    margin-top: 0;
  }

  .hero-section .ui.button {
    padding: 0.8rem 1.5rem;
    font-size: 0.95rem;
  }
}
</style>

