import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import { getCourseDetails, addModule, addSection } from '../../api/courseService'
import courseService from '../../api/courseService'
import LoadingSpinner from '../../components/ui/LoadingSpinner'

const CourseBuilder = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [modules, setModules] = useState([])
  const [activeModule, setActiveModule] = useState(null)
  const [loading, setLoading] = useState(true)
  const [newModule, setNewModule] = useState({ title: '', description: '' })
  const [newSection, setNewSection] = useState({ 
    title: '', 
    content: '', 
    contentType: 'text', 
    duration: 0 
  })

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourseDetails(id)
        setCourse(response.data)
        setModules(response.data.modules || [])
      } catch (error) {
        console.error('Error fetching course:', error)
        navigate('/')
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [id, navigate])

  const handleAddModule = async () => {
    try {
      setLoading(true)
      const response = await addModule(id, {
        ...newModule,
        order: modules.length + 1
      })
      setModules([...modules, response.data.module])
      setNewModule({ title: '', description: '' })
    } catch (error) {
      console.error('Error adding module:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddSection = async () => {
    try {
      setLoading(true)
      const response = await addSection(activeModule, {
        ...newSection,
        order: (course.sections?.length || 0) + 1
      })
      // Update the course/modules state with new section
      // This would depend on your state structure
      setNewSection({ title: '', content: '', contentType: 'text', duration: 0 })
    } catch (error) {
      console.error('Error adding section:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course Builder: {course?.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h2 className="text-lg font-semibold mb-4">Add New Module</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Module Title"
                className="w-full p-2 border rounded"
                value={newModule.title}
                onChange={(e) => setNewModule({...newModule, title: e.target.value})}
              />
              <textarea
                placeholder="Description"
                className="w-full p-2 border rounded"
                rows="3"
                value={newModule.description}
                onChange={(e) => setNewModule({...newModule, description: e.target.value})}
              />
              <button
                onClick={handleAddModule}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Module
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Modules</h2>
            <ul className="space-y-2">
              {modules.map((module) => (
                <li 
                  key={module._id}
                  className={`p-2 rounded cursor-pointer ${activeModule === module._id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveModule(module._id)}
                >
                  {module.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-2">
          {activeModule ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                Add Section to: {modules.find(m => m._id === activeModule)?.title}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={newSection.title}
                    onChange={(e) => setNewSection({...newSection, title: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={newSection.contentType}
                    onChange={(e) => setNewSection({...newSection, contentType: e.target.value})}
                  >
                    <option value="text">Text</option>
                    <option value="video">Video</option>
                    <option value="quiz">Quiz</option>
                    <option value="pdf">PDF</option>
                    <option value="assignment">Assignment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {newSection.contentType === 'video' ? 'Video URL' : 
                     newSection.contentType === 'pdf' ? 'PDF URL' : 'Content'}
                  </label>
                  {newSection.contentType === 'text' ? (
                    <textarea
                      className="w-full p-2 border rounded"
                      rows="6"
                      value={newSection.content}
                      onChange={(e) => setNewSection({...newSection, content: e.target.value})}
                    />
                  ) : (
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={newSection.content}
                      onChange={(e) => setNewSection({...newSection, content: e.target.value})}
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={newSection.duration}
                    onChange={(e) => setNewSection({...newSection, duration: e.target.value})}
                  />
                </div>

                <button
                  onClick={handleAddSection}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Add Section
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-600">Select a module to add sections</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseBuilder