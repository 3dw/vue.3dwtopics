/**
 * API 服務層 - 連接 Cloudflare Worker
 */

// 從環境變數獲取 API 基礎 URL，如果沒有則使用預設值
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://your-worker.your-subdomain.workers.dev'

// 課程介面定義
export interface Course {
  id: number
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

// API 回應介面
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

/**
 * 獲取所有課程
 */
export async function fetchCourses(): Promise<Course[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: ApiResponse<Course[]> = await response.json()
    
    if (result.success && result.data) {
      return result.data
    } else {
      throw new Error(result.error || 'Failed to fetch courses')
    }
  } catch (error) {
    console.error('Error fetching courses:', error)
    // 如果 API 失敗，返回空陣列或拋出錯誤
    throw error
  }
}

/**
 * 根據 ID 獲取單個課程
 */
export async function fetchCourseById(id: number): Promise<Course> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: ApiResponse<Course> = await response.json()
    
    if (result.success && result.data) {
      return result.data
    } else {
      throw new Error(result.error || 'Failed to fetch course')
    }
  } catch (error) {
    console.error('Error fetching course:', error)
    throw error
  }
}

/**
 * 創建新課程（管理員功能）
 */
export async function createCourse(course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<Course> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: ApiResponse<Course> = await response.json()
    
    if (result.success && result.data) {
      return result.data
    } else {
      throw new Error(result.error || 'Failed to create course')
    }
  } catch (error) {
    console.error('Error creating course:', error)
    throw error
  }
}

/**
 * 更新課程（管理員功能）
 */
export async function updateCourse(id: number, course: Partial<Course>): Promise<Course> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: ApiResponse<Course> = await response.json()
    
    if (result.success && result.data) {
      return result.data
    } else {
      throw new Error(result.error || 'Failed to update course')
    }
  } catch (error) {
    console.error('Error updating course:', error)
    throw error
  }
}

/**
 * 刪除課程（管理員功能）
 */
export async function deleteCourse(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/courses/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: ApiResponse<void> = await response.json()
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to delete course')
    }
  } catch (error) {
    console.error('Error deleting course:', error)
    throw error
  }
}

