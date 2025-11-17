# Cloudflare Worker 與 D1 資料庫設置指南

## 步驟 1：創建 D1 資料庫

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 選擇你的帳戶
3. 在左側選單選擇 **Workers & Pages** → **D1**
4. 點擊 **Create database**
5. 輸入資料庫名稱（例如：`courses-db`）
6. 選擇區域（建議選擇離用戶最近的區域）
7. 點擊 **Create**

## 步驟 2：初始化資料庫結構

1. 在 D1 資料庫頁面，點擊你剛創建的資料庫
2. 點擊 **Console** 標籤
3. 執行以下 SQL 腳本：

```sql
CREATE TABLE IF NOT EXISTS courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  teacher TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  level TEXT NOT NULL,
  duration TEXT NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  videoUrl TEXT,
  createdAt TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 插入範例數據
INSERT INTO courses (title, teacher, description, category, level, duration, price, videoUrl)
VALUES 
  ('野外可食植物辨識', 'Friday', '探索植物與環境的互動關係，了解生態系統中的植物角色。', '野外生態', '初學者', '8 小時', 0, NULL),
  ('數學教育DIY', '小巴老師', '培養數學邏輯思維，從日常生活問題中學習數學概念。', '數學教育', '初學者', '8 小時', 0, 'https://www.youtube.com/embed/Cw0kHk9E9t8?si=As0xp6f4dlw&list=PLebzuoh5ZI3LrVduRDqLcxCxlkruyDL27');
```

## 步驟 3：創建 Cloudflare Worker

1. 在 Cloudflare Dashboard，選擇 **Workers & Pages** → **Create application**
2. 選擇 **Create Worker**
3. 輸入 Worker 名稱（例如：`courses-api`）
4. 點擊 **Deploy**

## 步驟 4：綁定 D1 資料庫到 Worker

1. 在 Worker 頁面，點擊 **Settings** → **Variables**
2. 在 **D1 Database bindings** 區塊，點擊 **Add binding**
3. 輸入變數名稱：`DB`（必須與程式碼中的 `Env.DB` 一致）
4. 選擇你創建的 D1 資料庫
5. 點擊 **Save**

## 步驟 5：部署 Worker 程式碼

1. 在 Worker 頁面，點擊 **Quick edit** 或 **Edit code**
2. 將 `cloudflare-worker-example.ts` 的內容複製到編輯器
3. 點擊 **Save and deploy**

## 步驟 6：獲取 Worker URL

1. 在 Worker 頁面，你會看到 Worker 的 URL
2. 格式類似：`https://courses-api.your-subdomain.workers.dev`
3. 複製這個 URL

## 步驟 7：配置前端環境變數

1. 在專案根目錄創建 `.env.local` 檔案（如果還沒有）
2. 添加以下內容：

```env
VITE_API_BASE_URL=https://courses-api.your-subdomain.workers.dev
```

3. 將 `your-subdomain` 替換為你的實際 Worker URL

## 步驟 8：測試連接

1. 重新啟動開發伺服器：
   ```bash
   npm run dev
   ```

2. 訪問 `http://localhost:5173/courses`
3. 應該能看到從 D1 資料庫載入的課程數據

## API 端點說明

### 獲取所有課程
```
GET /api/courses
```

回應範例：
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "野外可食植物辨識",
      "teacher": "Friday",
      "description": "探索植物與環境的互動關係...",
      "category": "野外生態",
      "level": "初學者",
      "duration": "8 小時",
      "price": 0,
      "videoUrl": null,
      "createdAt": "2024-01-01 00:00:00",
      "updatedAt": "2024-01-01 00:00:00"
    }
  ]
}
```

### 獲取單個課程
```
GET /api/courses/:id
```

### 創建課程
```
POST /api/courses
Content-Type: application/json

{
  "title": "課程名稱",
  "teacher": "講師名稱",
  "description": "課程描述",
  "category": "分類",
  "level": "難度",
  "duration": "時長",
  "price": 0,
  "videoUrl": "影片 URL（可選）"
}
```

### 更新課程
```
PUT /api/courses/:id
Content-Type: application/json

{
  "title": "更新的課程名稱",
  ...
}
```

### 刪除課程
```
DELETE /api/courses/:id
```

## 疑難排解

### 問題：CORS 錯誤
- 確認 Worker 程式碼中包含 CORS 標頭
- 檢查 `corsHeaders` 是否正確設置
- 確認 Worker 已正確部署

### 問題：無法連接 Worker
- 確認 `.env.local` 中的 URL 正確
- 確認 Worker 已部署
- 檢查瀏覽器控制台的錯誤訊息
- 確認 Worker URL 可以訪問（在瀏覽器中直接打開）

### 問題：資料庫查詢失敗
- 確認 D1 資料庫已正確綁定到 Worker
- 確認資料庫表結構正確
- 檢查 Worker 日誌（在 Cloudflare Dashboard 的 Workers 頁面 → Logs）
- 確認資料庫中有數據

### 問題：環境變數不生效
- 確認檔案名稱是 `.env.local`（不是 `.env.local.txt`）
- 確認環境變數名稱以 `VITE_` 開頭
- 重新啟動開發伺服器

## 本地開發（可選）

如果你想在本地測試 Worker：

1. 安裝 Wrangler CLI：
   ```bash
   npm install -g wrangler
   ```

2. 登入 Cloudflare：
   ```bash
   wrangler login
   ```

3. 在專案根目錄創建 `wrangler.toml`：
   ```toml
   name = "courses-api"
   main = "cloudflare-worker-example.ts"
   compatibility_date = "2024-01-01"

   [[d1_databases]]
   binding = "DB"
   database_name = "courses-db"
   database_id = "your-database-id"
   ```

4. 本地運行：
   ```bash
   wrangler dev
   ```

## 下一步

- 添加身份驗證（使用 Cloudflare Access 或自定義 JWT）
- 添加圖片上傳功能（使用 Cloudflare R2）
- 添加快取策略
- 添加速率限制
- 添加資料驗證和錯誤處理

## 相關檔案

- `cloudflare-worker-example.ts` - Worker 程式碼範例
- `src/services/api.ts` - 前端 API 服務層
- `ENV_SETUP.md` - 環境變數設置說明

