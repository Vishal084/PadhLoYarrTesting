

// import api from "./authService"

// export const updateUserProfile = (data) => api.put("/user/profile", data)
// export const deleteUserAccount = () => api.delete("/user/account")
// export const uploadAvatar = (file) => {
//   const formData = new FormData()
//   formData.append("avatar", file)
//   return api.post("/user/avatar", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   })
// }
// export const getCurrentUser = () => api.get("/user/me")
// export const updateUserDetails = (data) => api.put("/user/profile", data)
// export const deleteAccount = () => api.delete("/user/account")


// userService.js
import api from "./authService"

const userService = {
  updateUserProfile: (data) => api.put("/user/profile", data),
  deleteUserAccount: () => api.delete("/user/account"),
  uploadAvatar: (file) => {
    const formData = new FormData()
    formData.append("avatar", file)
    return api.post("/user/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
  getCurrentUser: () => api.get("/user/me"),
  updateUserDetails: (data) => api.put("/user/profile", data),
  deleteAccount: () => api.delete("/user/account")
}

export default userService