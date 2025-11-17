/**
 * Cloudflare Worker 範例程式碼
 * 用於連接 D1 資料庫並提供課程 API
 * 
 * 部署步驟：
 * 1. 在 Cloudflare Dashboard 創建 Worker
 * 2. 創建 D1 資料庫並綁定到 Worker
 * 3. 執行 SQL 初始化腳本（見下方）
 * 4. 將此程式碼部署到 Worker
 */

export interface Env {
  DB: D1Database  // D1 資料庫綁定
}

// CORS 標頭
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

// 課程介面
interface Course {
  id?: number
  title: string
  teacher: string
  description: string
  category: string
  level: string
  duration: string
  price: number
  videoUrl?: string
  createdAt?: string
  updatedAt?: string
}

// API 回應格式
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// 處理 CORS 預檢請求
function handleOptions(): Response {
  return new Response(null, {
    headers: corsHeaders,
  })
}

// 成功回應
function jsonResponse<T>(data: T, status: number = 200): Response {
  const response: ApiResponse<T> = {
    success: true,
    data,
  }
  return new Response(JSON.stringify(response), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  })
}

// 錯誤回應
function errorResponse(message: string, status: number = 400): Response {
  const response: ApiResponse<null> = {
    success: false,
    error: message,
  }
  return new Response(JSON.stringify(response), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  })
}

// 獲取所有課程
async function getCourses(env: Env): Promise<Response> {
  try {
    const { results } = await env.DB.prepare(
      'SELECT * FROM courses ORDER BY createdAt DESC'
    ).all<Course>()

    return jsonResponse(results || [])
  } catch (error) {
    console.error('Error fetching courses:', error)
    return errorResponse('Failed to fetch courses', 500)
  }
}

// 根據 ID 獲取單個課程
async function getCourseById(env: Env, id: number): Promise<Response> {
  try {
    const course = await env.DB.prepare(
      'SELECT * FROM courses WHERE id = ?'
    ).bind(id).first<Course>()

    if (!course) {
      return errorResponse('Course not found', 404)
    }

    return jsonResponse(course)
  } catch (error) {
    console.error('Error fetching course:', error)
    return errorResponse('Failed to fetch course', 500)
  }
}

// 創建新課程
async function createCourse(env: Env, courseData: Course): Promise<Response> {
  try {
    const { title, teacher, description, category, level, duration, price, videoUrl } = courseData

    if (!title || !teacher || !description || !category || !level || !duration) {
      return errorResponse('Missing required fields', 400)
    }

    const result = await env.DB.prepare(
      `INSERT INTO courses (title, teacher, description, category, level, duration, price, videoUrl, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
       RETURNING *`
    ).bind(title, teacher, description, category, level, duration, price || 0, videoUrl || null)
      .first<Course>()

    return jsonResponse(result, 201)
  } catch (error) {
    console.error('Error creating course:', error)
    return errorResponse('Failed to create course', 500)
  }
}

// 更新課程
async function updateCourse(env: Env, id: number, courseData: Partial<Course>): Promise<Response> {
  try {
    // 先檢查課程是否存在
    const existing = await env.DB.prepare(
      'SELECT * FROM courses WHERE id = ?'
    ).bind(id).first<Course>()

    if (!existing) {
      return errorResponse('Course not found', 404)
    }

    // 構建更新語句
    const updates: string[] = []
    const values: any[] = []

    if (courseData.title !== undefined) {
      updates.push('title = ?')
      values.push(courseData.title)
    }
    if (courseData.teacher !== undefined) {
      updates.push('teacher = ?')
      values.push(courseData.teacher)
    }
    if (courseData.description !== undefined) {
      updates.push('description = ?')
      values.push(courseData.description)
    }
    if (courseData.category !== undefined) {
      updates.push('category = ?')
      values.push(courseData.category)
    }
    if (courseData.level !== undefined) {
      updates.push('level = ?')
      values.push(courseData.level)
    }
    if (courseData.duration !== undefined) {
      updates.push('duration = ?')
      values.push(courseData.duration)
    }
    if (courseData.price !== undefined) {
      updates.push('price = ?')
      values.push(courseData.price)
    }
    if (courseData.videoUrl !== undefined) {
      updates.push('videoUrl = ?')
      values.push(courseData.videoUrl)
    }

    updates.push("updatedAt = datetime('now')")
    values.push(id)

    const result = await env.DB.prepare(
      `UPDATE courses SET ${updates.join(', ')} WHERE id = ? RETURNING *`
    ).bind(...values).first<Course>()

    return jsonResponse(result)
  } catch (error) {
    console.error('Error updating course:', error)
    return errorResponse('Failed to update course', 500)
  }
}

// 刪除課程
async function deleteCourse(env: Env, id: number): Promise<Response> {
  try {
    const result = await env.DB.prepare(
      'DELETE FROM courses WHERE id = ?'
    ).bind(id).run()

    if (result.success && result.meta.changes > 0) {
      return jsonResponse({ message: 'Course deleted successfully' })
    } else {
      return errorResponse('Course not found', 404)
    }
  } catch (error) {
    console.error('Error deleting course:', error)
    return errorResponse('Failed to delete course', 500)
  }
}

// 主處理函數
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // 處理 CORS 預檢請求
    if (request.method === 'OPTIONS') {
      return handleOptions()
    }

    const url = new URL(request.url)
    const path = url.pathname

    // API 路由
    if (path.startsWith('/api/courses')) {
      const method = request.method
      const courseIdMatch = path.match(/^\/api\/courses\/(\d+)$/)

      if (courseIdMatch) {
        // 單個課程操作
        const id = parseInt(courseIdMatch[1], 10)

        switch (method) {
          case 'GET':
            return getCourseById(env, id)
          case 'PUT':
            const updateData = await request.json<Partial<Course>>()
            return updateCourse(env, id, updateData)
          case 'DELETE':
            return deleteCourse(env, id)
          default:
            return errorResponse('Method not allowed', 405)
        }
      } else if (path === '/api/courses') {
        // 課程列表操作
        switch (method) {
          case 'GET':
            return getCourses(env)
          case 'POST':
            const createData = await request.json<Course>()
            return createCourse(env, createData)
          default:
            return errorResponse('Method not allowed', 405)
        }
      }
    }

    // 健康檢查端點
    if (path === '/health') {
      return jsonResponse({ status: 'ok', timestamp: new Date().toISOString() })
    }

    return errorResponse('Not found', 404)
  },
}

/**
 * D1 資料庫初始化 SQL 腳本
 * 
 * 在 Cloudflare Dashboard 的 D1 資料庫中執行以下 SQL：
 * 
 * CREATE TABLE IF NOT EXISTS courses (
 *   id INTEGER PRIMARY KEY AUTOINCREMENT,
 *   title TEXT NOT NULL,
 *   teacher TEXT NOT NULL,
 *   description TEXT NOT NULL,
 *   category TEXT NOT NULL,
 *   level TEXT NOT NULL,
 *   duration TEXT NOT NULL,
 *   price INTEGER NOT NULL DEFAULT 0,
 *   videoUrl TEXT,
 *   createdAt TEXT NOT NULL DEFAULT (datetime('now')),
 *   updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
 * );
 * 
 * -- 插入範例數據
 * INSERT INTO courses (title, teacher, description, category, level, duration, price, videoUrl)
 * VALUES 
 *   ('野外可食植物辨識', 'Friday', '探索植物與環境的互動關係，了解生態系統中的植物角色。', '野外生態', '初學者', '8 小時', 0, NULL),
 *   ('數學教育DIY', '小巴老師', '培養數學邏輯思維，從日常生活問題中學習數學概念。', '數學教育', '初學者', '8 小時', 0, 'https://www.youtube.com/embed/Cw0kHk9E9t8?si=As0xp6f4dlw&list=PLebzuoh5ZI3LrVduRDqLcxCxlkruyDL27');
 */

