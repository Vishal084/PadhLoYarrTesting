
// import api from "./authService"

// export const getUsers = () => api.get("/admin/users")
// export const getAllUsers = () => api.get("/admin/users")
// export const updateUserRole = (userId, role) => api.put(`/admin/users/${userId}/role`, { role })
// export const suspendUser = (userId) => api.post(`/admin/users/${userId}/suspend`)
// export const getPlatformStats = () => api.get("/admin/stats")
// export const getRevenueReports = (period) => api.get(`/admin/revenue?period=${period}`)








// adminService.js
import api from "./authService"

const adminService = {
  getUsers: () => api.get("/admin/users"),
  getAllUsers: () => api.get("/admin/users"),
  updateUserRole: (userId, role) => api.put(`/admin/users/${userId}/role`, { role }),
  suspendUser: (userId) => api.post(`/admin/users/${userId}/suspend`),
  getPlatformStats: () => api.get("/admin/stats"),
  getRevenueReports: (period) => api.get(`/admin/revenue?period=${period}`)
}

export default adminService