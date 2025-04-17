


import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
// import { getProgress, updateProgress, markSectionCompleted } from '../../api/progressService'
import progressService from '../../api/progressService'
import LoadingSpinner from '../ui/LoadingSpinner'

const CourseProgress = ({ courseId, sections }) => {
  const { user } = useAuth()
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)
  const [completedSections, setCompletedSections] = useState([])

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await getProgress(courseId)
        setProgress(response.data)
        setCompletedSections(response.data.completedSections || [])
      } catch (error) {
        console.error('Error fetching progress:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchProgress()
    } else {
      setLoading(false)
    }
  }, [courseId, user])

  const handleSectionToggle = async (sectionId) => {
    if (!user) return
    
    try {
      setLoading(true)
      const isCompleted = completedSections.includes(sectionId)
      
      // Use the new markSectionCompleted API
      const response = await markSectionCompleted({
        courseId,
        sectionId,
        completed: !isCompleted
      })
      
      setCompletedSections(response.data.completedSections)
      setProgress(response.data)
    } catch (error) {
      console.error('Error updating progress:', error)
    } finally {
      setLoading(false)
    }
  }

  // Legacy code for backward compatibility
  const handleModuleToggle = async (moduleId) => {
    if (!user) return
    
    try {
      setLoading(true)
      let updatedCompletedModules = []
      
      if (progress?.completedModules.includes(moduleId)) {
        updatedCompletedModules = progress.completedModules.filter(id => id !== moduleId)
      } else {
        updatedCompletedModules = [...progress?.completedModules || [], moduleId]
      }
      
      const totalModules = sections ? sections.length : progress?.totalModules || 1
      const completion = Math.round((updatedCompletedModules.length / totalModules) * 100)
      
      const response = await updateProgress({
        courseId,
        completedModules: updatedCompletedModules,
        completion
      })
      
      setProgress(response.data)
    } catch (error) {
      console.error('Error updating progress:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  // Calculate completion percentage based on what data is available
  const completionPercentage = progress 
    ? progress.completion !== undefined 
      ? progress.completion 
      : sections 
        ? Math.round((completedSections.length / sections.length) * 100)
        : 0
    : 0

  const totalSections = sections ? sections.length : progress?.totalModules || 0
  const completedCount = completedSections.length || progress?.completedModules?.length || 0

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-2">Your Progress</h3>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        {completionPercentage}% complete ({completedCount} of {totalSections} sections)
      </p>

      {sections && (
        <div className="space-y-2">
          {sections.map((section) => (
            <div key={section._id} className="flex items-center">
              <input
                type="checkbox"
                checked={completedSections.includes(section._id)}
                onChange={() => handleSectionToggle(section._id)}
                className="mr-3 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                disabled={!user || loading}
              />
              <span className={completedSections.includes(section._id) ? 'line-through text-gray-500' : ''}>
                {section.title}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CourseProgress