/**
 * Cloudflare Worker JavaScript 版本
 * 用於連接 D1 資料庫並提供課程 API
 * 
 * 注意：這是 JavaScript 版本，可直接在 Cloudflare Worker 編輯器中使用
 */

// CORS 標頭
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

// 處理 CORS 預檢請求
function handleOptions() {
  return new Response(null, {
    headers: corsHeaders,
  })
}

// 成功回應
function jsonResponse(data, status = 200) {
  const response = {
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
function errorResponse(message, status = 400) {
  const response = {
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
async function getCourses(env) {
  try {
    const { results } = await env.DB.prepare(
      'SELECT * FROM courses ORDER BY createdAt DESC'
    ).all()

    return jsonResponse(results || [])
  } catch (error) {
    console.error('Error fetching courses:', error)
    return errorResponse('Failed to fetch courses', 500)
  }
}

// 根據 ID 獲取單個課程
async function getCourseById(env, id) {
  try {
    const course = await env.DB.prepare(
      'SELECT * FROM courses WHERE id = ?'
    ).bind(id).first()

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
async function createCourse(env, courseData) {
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
      .first()

    return jsonResponse(result, 201)
  } catch (error) {
    console.error('Error creating course:', error)
    return errorResponse('Failed to create course', 500)
  }
}

// 更新課程
async function updateCourse(env, id, courseData) {
  try {
    // 先檢查課程是否存在
    const existing = await env.DB.prepare(
      'SELECT * FROM courses WHERE id = ?'
    ).bind(id).first()

    if (!existing) {
      return errorResponse('Course not found', 404)
    }

    // 構建更新語句
    const updates = []
    const values = []

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
    ).bind(...values).first()

    return jsonResponse(result)
  } catch (error) {
    console.error('Error updating course:', error)
    return errorResponse('Failed to update course', 500)
  }
}

// 刪除課程
async function deleteCourse(env, id) {
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
  async fetch(request, env) {
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
            const updateData = await request.json()
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
            const createData = await request.json()
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

