# Cloudflare Pages 環境變數設置指南

## 問題說明

生產環境 `https://topics.alearn.org.tw/courses` 顯示「無法連接到伺服器，顯示本地數據」，是因為 Cloudflare Pages 沒有配置環境變數 `VITE_API_BASE_URL`。

## 解決步驟

### 步驟 1：進入 Cloudflare Pages 設置

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 選擇你的帳戶
3. 在左側選單選擇 **Workers & Pages**
4. 找到你的 Pages 專案：`vue-3dwtopics`
5. 點擊進入專案頁面

### 步驟 2：設置環境變數

1. 在專案頁面，點擊 **Settings** 標籤
2. 在左側選單找到 **Environment variables**（環境變數）
3. 點擊 **Add variable** 或 **Add environment variable**

### 步驟 3：添加環境變數

1. **Variable name（變數名稱）**：輸入 `VITE_API_BASE_URL`
   - ⚠️ 重要：必須以 `VITE_` 開頭，這樣 Vite 才會在構建時包含它

2. **Value（值）**：輸入你的 Worker URL
   ```
   https://courses-api.alearn13994229.workers.dev
   ```
   - 請確認這個 URL 是正確的（可以在 Worker 的 Overview 頁面找到）

3. **Environment（環境）**：
   - ✅ 勾選 **Production**（生產環境）
   - ✅ 勾選 **Preview**（預覽環境，可選）
   - ✅ 勾選 **Branch preview**（分支預覽，可選）

4. 點擊 **Save**

### 步驟 4：重新部署

設置環境變數後，需要重新部署才能生效：

1. 在 Pages 專案頁面，點擊 **Deployments** 標籤
2. 找到最新的部署，點擊右側的 **...** 選單
3. 選擇 **Retry deployment**（重新部署）
   
   或者：
   
4. 如果你使用 Git 連接，可以：
   - 推送一個新的 commit 到 GitHub
   - Cloudflare Pages 會自動觸發新的部署

### 步驟 5：驗證設置

1. 等待部署完成（通常需要 1-2 分鐘）
2. 訪問 `https://topics.alearn.org.tw/courses`
3. 應該能看到從 D1 資料庫載入的課程數據，而不是錯誤訊息

## 檢查清單

- [ ] 環境變數名稱正確：`VITE_API_BASE_URL`（必須以 `VITE_` 開頭）
- [ ] Worker URL 正確且可訪問
- [ ] 已勾選 Production 環境
- [ ] 已重新部署 Pages 專案
- [ ] 部署狀態顯示為成功

## 疑難排解

### 問題：設置環境變數後仍然顯示錯誤

1. **確認環境變數名稱**：
   - 必須是 `VITE_API_BASE_URL`（不是 `API_BASE_URL`）
   - Vite 只會暴露以 `VITE_` 開頭的環境變數

2. **確認已重新部署**：
   - 環境變數只在新的部署中生效
   - 必須重新部署才能使用新的環境變數

3. **檢查 Worker URL**：
   - 在瀏覽器中直接訪問 Worker URL
   - 應該能看到 API 回應（例如：`/health` 端點）

4. **檢查瀏覽器控制台**：
   - 打開開發者工具（F12）
   - 查看 Console 和 Network 標籤
   - 確認 API 請求的 URL 是否正確

### 問題：如何確認環境變數是否生效？

在程式碼中暫時添加（僅用於測試）：
```javascript
console.log('API URL:', import.meta.env.VITE_API_BASE_URL)
```

然後在瀏覽器控制台查看輸出。

## 相關檔案

- `.env.local` - 本地開發環境變數（不會被部署）
- `src/services/api.ts` - API 服務層
- `CLOUDFLARE_SETUP.md` - Worker 設置指南

