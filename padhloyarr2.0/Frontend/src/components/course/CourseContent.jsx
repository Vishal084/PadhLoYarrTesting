// import { useState, useEffect } from 'react'
// import { getCourseModules } from '../../api/courseService'
// import LoadingSpinner from '../ui/LoadingSpinner'

// const CourseContent = ({ courseId }) => {
//   const [modules, setModules] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [expandedModule, setExpandedModule] = useState(null)

//   useEffect(() => {
//     const fetchModules = async () => {
//       try {
//         const response = await getCourseModules(courseId)
//         setModules(response.data.modules)
//       } catch (error) {
//         console.error('Error fetching modules:', error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchModules()
//   }, [courseId])

//   const toggleModule = (moduleId) => {
//     setExpandedModule(expandedModule === moduleId ? null : moduleId)
//   }

//   if (loading) return <LoadingSpinner />

//   return (
//     <div className="space-y-4">
//       <h2 className="text-xl font-semibold mb-4">Course Content</h2>
//       {modules.length === 0 ? (
//         <p>No content available yet.</p>
//       ) : (
//         modules.map((module) => (
//           <div key={module._id} className="border rounded-lg overflow-hidden">
//             <button
//               className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
//               onClick={() => toggleModule(module._id)}
//             >
//               <span className="font-medium">{module.title}</span>
//               <span>{expandedModule === module._id ? '−' : '+'}</span>
//             </button>
//             {expandedModule === module._id && (
//               <div className="p-4 bg-white">
//                 <p className="mb-4">{module.description}</p>
//                 <ModuleSections moduleId={module._id} />
//               </div>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   )
// }

// const ModuleSections = ({ moduleId }) => {
//   const [sections, setSections] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchSections = async () => {
//       try {
//         const response = await getModuleSections(moduleId)
//         setSections(response.data.sections)
//       } catch (error) {
//         console.error('Error fetching sections:', error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchSections()
//   }, [moduleId])

//   if (loading) return <LoadingSpinner />

//   return (
//     <div className="space-y-3">
//       {sections.length === 0 ? (
//         <p>No sections in this module.</p>
//       ) : (
//         sections.map((section) => (
//           <div key={section._id} className="border-l-4 border-blue-500 pl-4 py-2">
//             <h4 className="font-medium">{section.title}</h4>
//             <p className="text-sm text-gray-600">
//               {section.contentType} • {section.duration} min
//             </p>
//           </div>
//         ))
//       )}
//     </div>
//   )
// }

// export default CourseContent



import { useState, useEffect } from 'react'
import courseService from '../../api/courseService'
import LoadingSpinner from '../ui/LoadingSpinner'

const { getCourseModules, getModuleSections } = courseService

const CourseContent = ({ courseId }) => {
  const [modules, setModules] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedModule, setExpandedModule] = useState(null)

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await getCourseModules(courseId)
        setModules(response.data.modules)
      } catch (error) {
        console.error('Error fetching modules:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchModules()
  }, [courseId])

  const toggleModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId)
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Course Content</h2>
      {modules.length === 0 ? (
        <p>No content available yet.</p>
      ) : (
        modules.map((module) => (
          <div key={module._id} className="border rounded-lg overflow-hidden">
            <button
              className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
              onClick={() => toggleModule(module._id)}
            >
              <span className="font-medium">{module.title}</span>
              <span>{expandedModule === module._id ? '−' : '+'}</span>
            </button>
            {expandedModule === module._id && (
              <div className="p-4 bg-white">
                <p className="mb-4">{module.description}</p>
                <ModuleSections moduleId={module._id} />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}

const ModuleSections = ({ moduleId }) => {
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await getModuleSections(moduleId)
        setSections(response.data.sections)
      } catch (error) {
        console.error('Error fetching sections:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSections()
  }, [moduleId])

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-3">
      {sections.length === 0 ? (
        <p>No sections in this module.</p>
      ) : (
        sections.map((section) => (
          <div key={section._id} className="border-l-4 border-blue-500 pl-4 py-2">
            <h4 className="font-medium">{section.title}</h4>
            <p className="text-sm text-gray-600">
              {section.contentType} • {section.duration} min
            </p>
          </div>
        ))
      )}
    </div>
  )
}

export default CourseContent
