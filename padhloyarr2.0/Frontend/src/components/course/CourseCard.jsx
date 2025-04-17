import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const CourseCard = ({ course }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { user } = useAuth();
  
  const isInWishlist = wishlist?.some(item => item._id === course._id);

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) return
    
    try {
      if (isInWishlist) {
        await removeFromWishlist(course._id);
      } else {
        await addToWishlist(course._id);
      }
    } catch (error) {
      console.error('Wishlist error:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative">
      <Link to={`/courses/${course._id}`}>
        <img 
          src={course.thumbnail || '/placeholder-course.jpg'} 
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        {user && (
          <button 
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow"
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isInWishlist ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-500" />
            )}
          </button>
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
          <p className="text-gray-600 text-sm mb-2">By {course.instructor?.name}</p>
          <div className="flex items-center mb-2">
            <span className="text-yellow-500 mr-1">★ {course.averageRating?.toFixed(1) || '0.0'}</span>
            <span className="text-gray-600 text-sm">({course.reviews?.length || 0})</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">₹{course.price}</span>
            <span className="text-sm text-gray-600">{course.duration} hours</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;