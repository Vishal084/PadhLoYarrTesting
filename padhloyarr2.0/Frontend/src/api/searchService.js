
// import api from "./authService"

// export const searchCourses = (query) => api.get("/search/courses", { params: query })
// export const getCategories = () => api.get("/search/categories")
// export const getPopularSearches = () => api.get("/search/popular")
// export const getRecommendedCourses = () => api.get("/search/recommended")



// searchService.js
import api from "./authService"

const searchService = {
  searchCourses: (query) => api.get("/search/courses", { params: query }),
  getCategories: () => api.get("/search/categories"),
  getPopularSearches: () => api.get("/search/popular"),
  getRecommendedCourses: () => api.get("/search/recommended")
}

export default searchService