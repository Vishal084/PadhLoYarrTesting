

// import api from './authService'

// const API_PREFIX = '/api/v1'

// export const getCourses = () => api.get(`${API_PREFIX}/courses`)
// export const getCourseDetails = (id) => api.get(`${API_PREFIX}/courses/${id}`)
// export const createCourse = (data) => api.post(`${API_PREFIX}/courses`, data)
// export const updateCourse = (id, data) => api.put(`${API_PREFIX}/courses/${id}`, data)
// export const deleteCourse = (id) => api.delete(`${API_PREFIX}/courses/${id}`)
// export const publishCourse = (id) => api.post(`${API_PREFIX}/courses/${id}/publish`)
// export const searchCourses = (query) => api.get(`${API_PREFIX}/search/courses`, { params: query })
// export const getCategories = () => api.get(`${API_PREFIX}/search/categories`)

// courseService.js
import api from './authService'

const API_PREFIX = '/api/v1'

const courseService = {
  getCourses: () => api.get(`${API_PREFIX}/courses`),
  getCourseDetails: (id) => api.get(`${API_PREFIX}/courses/${id}`),
  createCourse: (data) => api.post(`${API_PREFIX}/courses`, data),
  updateCourse: (id, data) => api.put(`${API_PREFIX}/courses/${id}`, data),
  deleteCourse: (id) => api.delete(`${API_PREFIX}/courses/${id}`),
  publishCourse: (id) => api.post(`${API_PREFIX}/courses/${id}/publish`),
  searchCourses: (query) => api.get(`${API_PREFIX}/search/courses`, { params: query }),
  getCategories: () => api.get(`${API_PREFIX}/search/categories`)
}

export default courseService