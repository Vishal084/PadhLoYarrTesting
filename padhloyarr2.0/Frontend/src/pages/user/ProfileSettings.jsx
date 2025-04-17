
// import { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { updateUserProfile, deleteUserAccount, uploadAvatar } from '../api/userService';

// const ProfileSettings = () => {
//   const { user, logout } = useAuth();
//   const [formData, setFormData] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
//     currentPassword: '',
//     newPassword: ''
//   });
//   const [avatar, setAvatar] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({...formData, [e.target.name]: e.target.value});
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       await updateUserProfile(formData);
//       if (avatar) {
//         await uploadAvatar(avatar);
//       }
//       alert('Profile updated successfully!');
//     } catch (error) {
//       alert(error.response?.data?.message || 'Update failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDeleteAccount = async () => {
//     if (window.confirm('Are you sure? This cannot be undone!')) {
//       try {
//         await deleteUserAccount();
//         logout();
//       } catch (error) {
//         alert(error.response?.data?.message || 'Deletion failed');
//       }
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
//       <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
      
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block mb-2">Profile Picture</label>
//           <input 
//             type="file" 
//             onChange={(e) => setAvatar(e.target.files[0])}
//             className="w-full p-2 border rounded"
//             accept="image/*"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             disabled
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Current Password</label>
//           <input
//             type="password"
//             name="currentPassword"
//             value={formData.currentPassword}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="Required for password changes"
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block mb-2">New Password</label>
//           <input
//             type="password"
//             name="newPassword"
//             value={formData.newPassword}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="Leave blank to keep current"
//           />
//         </div>

//         <div className="flex justify-between">
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
//           >
//             {isLoading ? 'Saving...' : 'Save Changes'}
//           </button>

//           <button
//             type="button"
//             onClick={handleDeleteAccount}
//             className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//           >
//             Delete Account
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProfileSettings;





import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
// import { updateUserProfile, deleteUserAccount, uploadAvatar } from "../../api/userService"
import userService from "../../api/userService"

const ProfileSettings = () => {
  const { user, logout } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
  })
  const [avatar, setAvatar] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await updateUserProfile(formData)
      if (avatar) {
        await uploadAvatar(avatar)
      }
      alert("Profile updated successfully!")
    } catch (error) {
      alert(error.response?.data?.message || "Update failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure? This cannot be undone!")) {
      try {
        await deleteUserAccount()
        logout()
      } catch (error) {
        alert(error.response?.data?.message || "Deletion failed")
      }
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Profile Picture</label>
          <input
            type="file"
            onChange={(e) => setAvatar(e.target.files[0])}
            className="w-full p-2 border rounded"
            accept="image/*"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Required for password changes"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Leave blank to keep current"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={handleDeleteAccount}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProfileSettings
