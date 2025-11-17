# 環境變數設置說明

## 快速開始

1. 複製環境變數範例檔案：
   ```bash
   cp .env.example .env.local
   ```

2. 編輯 `.env.local` 檔案，填入你的 Cloudflare Worker URL：
   ```env
   VITE_API_BASE_URL=https://your-worker.your-subdomain.workers.dev
   ```

3. 重新啟動開發伺服器：
   ```bash
   npm run dev
   ```

## 環境變數說明

### `VITE_API_BASE_URL`
- **說明**：Cloudflare Worker API 的基礎 URL
- **格式**：`https://your-worker.your-subdomain.workers.dev`
- **範例**：`https://courses-api.example.workers.dev`
- **必填**：是

## 注意事項

- `.env.local` 檔案不會被提交到 Git（已在 `.gitignore` 中）
- 如果沒有設置環境變數，系統會使用預設值（但會失敗，因為預設值不是真實的 URL）
- 如果 API 連接失敗，系統會自動使用本地靜態數據作為後備方案

## 生產環境設置

在部署到生產環境時，請在部署平台（如 Vercel、Netlify 等）的環境變數設置中添加：
- 變數名稱：`VITE_API_BASE_URL`
- 變數值：你的 Cloudflare Worker URL

