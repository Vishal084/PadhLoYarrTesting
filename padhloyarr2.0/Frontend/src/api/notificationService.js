

// import api from "./authService"

// export const getNotifications = () => api.get("/notifications")
// export const markAsRead = (notificationId) => api.put(`/notifications/${notificationId}/read`)
// export const markAllAsRead = () => api.put("/notifications/read-all")
// export const getUnreadCount = () => api.get("/notifications/unread-count")



// notificationService.js
import api from "./authService"

const notificationService = {
  getNotifications: () => api.get("/notifications"),
  markAsRead: (notificationId) => api.put(`/notifications/${notificationId}/read`),
  markAllAsRead: () => api.put("/notifications/read-all"),
  getUnreadCount: () => api.get("/notifications/unread-count")
}

export default notificationService