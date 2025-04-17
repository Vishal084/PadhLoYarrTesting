import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
// import { getCurrentUser, updateUserDetails, deleteAccount } from '../api/userService'
import userService from '../api/userService'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  currentPassword: Yup.string(),
  newPassword: Yup.string().when('currentPassword', {
    is: val => val && val.length > 0,
    then: Yup.string().min(8, 'Too short').required('Required')
  })
})

const Profile = () => {
  const { user, logout } = useAuth()
  const [userDetails, setUserDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser()
        setUserDetails(response.data.user)
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const updates = {}
      if (values.name !== userDetails.name) updates.name = values.name
      if (values.newPassword) {
        updates.currentPassword = values.currentPassword
        updates.newPassword = values.newPassword
      }

      if (Object.keys(updates).length > 0) {
        const response = await updateUserDetails(updates)
        setUserDetails(response.data.user)
        setSuccess('Profile updated successfully')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      try {
        await deleteAccount()
        logout()
      } catch (error) {
        console.error('Error deleting account:', error)
      }
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        {userDetails && (
          <Formik
            initialValues={{
              name: userDetails.name,
              email: userDetails.email,
              currentPassword: '',
              newPassword: ''
            }}
            validationSchema={ProfileSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <Field
                    name="email"
                    type="email"
                    disabled
                    className="mt-1 block w-full bg-gray-100 p-2 rounded border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <Field
                    name="name"
                    type="text"
                    className="mt-1 block w-full p-2 rounded border border-gray-300"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-3">Change Password</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Current Password</label>
                      <Field
                        name="currentPassword"
                        type="password"
                        className="mt-1 block w-full p-2 rounded border border-gray-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">New Password</label>
                      <Field
                        name="newPassword"
                        type="password"
                        className="mt-1 block w-full p-2 rounded border border-gray-300"
                      />
                      <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    {isSubmitting ? 'Updating...' : 'Update Profile'}
                  </button>

                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete Account
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  )
}

export default Profile