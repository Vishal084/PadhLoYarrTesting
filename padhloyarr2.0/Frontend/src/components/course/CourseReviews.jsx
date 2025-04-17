import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
// import { getCourseReviews, addReview } from '../../api/reviewService'
import reviewService from '../../api/reviewService'
import Rating from '@mui/material/Rating'
import LoadingSpinner from '../ui/LoadingSpinner'

const CourseReviews = ({ courseId, initialReviews = [] }) => {
  const { user } = useAuth()
  const [reviews, setReviews] = useState(initialReviews)
  const [loading, setLoading] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  })
  const [averageRating, setAverageRating] = useState(0)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        const response = await getCourseReviews(courseId)
        setReviews(response.data.reviews)
        setAverageRating(response.data.averageRating)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      } finally {
        setLoading(false)
      }
    }

    if (!initialReviews.length) {
      fetchReviews()
    } else {
      setReviews(initialReviews)
      const avg = initialReviews.reduce((sum, review) => sum + review.rating, 0) / initialReviews.length
      setAverageRating(avg || 0)
    }
  }, [courseId, initialReviews])

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    if (!newReview.comment.trim()) return

    try {
      setLoading(true)
      const response = await addReview(courseId, {
        rating: newReview.rating,
        comment: newReview.comment
      })
      setReviews([...reviews, response.data.review])
      setAverageRating(response.data.averageRating)
      setNewReview({ rating: 5, comment: '' })
    } catch (error) {
      console.error('Error submitting review:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <h2 className="text-xl font-semibold mr-4">Reviews</h2>
        <div className="flex items-center">
          <Rating 
            value={averageRating} 
            precision={0.5} 
            readOnly 
            size="medium" 
          />
          <span className="ml-2 text-gray-700">
            ({averageRating.toFixed(1)} out of 5)
          </span>
        </div>
      </div>

      {user && (
        <form onSubmit={handleSubmitReview} className="mb-8">
          <div className="mb-4">
            <Rating
              value={newReview.rating}
              onChange={(e, newValue) => setNewReview({...newReview, rating: newValue})}
              size="large"
            />
          </div>
          <div className="mb-4">
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              placeholder="Share your thoughts about this course..."
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}

      {loading && reviews.length === 0 ? (
        <LoadingSpinner />
      ) : reviews.length === 0 ? (
        <p className="text-gray-600">No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review._id} className="border-b pb-6">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                  {review.user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h4 className="font-medium">{review.user?.name || 'Anonymous'}</h4>
                  <div className="flex items-center">
                    <Rating 
                      value={review.rating} 
                      precision={0.5} 
                      readOnly 
                      size="small" 
                    />
                    <span className="text-xs text-gray-500 ml-2">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CourseReviews