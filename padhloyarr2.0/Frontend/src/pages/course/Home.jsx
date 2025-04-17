

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import courseService from '../../api/courseService'
import CourseCard from '../../components/course/CourseCard'
import LoadingSpinner from '../../components/ui/LoadingSpinner'

const { getCourses, getCategories, searchCourses } = courseService

const Home = () => {
  const [courses, setCourses] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({
    category: '',
    sort: '',
    search: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, categoriesRes] = await Promise.all([
          getCourses(),
          getCategories()
        ])
        setCourses(coursesRes.data)
        setCategories(categoriesRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleSearch = async () => {
    try {
      setLoading(true)
      const response = await searchCourses(filter)
      setCourses(response.data)
    } catch (error) {
      console.error('Error searching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Browse Courses</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search courses..."
            className="flex-grow p-2 border rounded"
            value={filter.search}
            onChange={(e) => setFilter({...filter, search: e.target.value})}
          />
          <select
            className="p-2 border rounded"
            value={filter.category}
            onChange={(e) => setFilter({...filter, category: e.target.value})}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            className="p-2 border rounded"
            value={filter.sort}
            onChange={(e) => setFilter({...filter, sort: e.target.value})}
          >
            <option value="">Sort By</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
          <button 
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  )
}

export default Home
