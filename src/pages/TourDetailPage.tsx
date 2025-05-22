import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Star, 
  Check, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Heart 
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Tour } from '../components/tours/TourCard';
import BookingForm from '../components/tours/BookingForm';

const tourData: Tour = {
  id: 1,
  title: 'Greek Islands Luxury Cruise',
  description: 'Experience the breathtaking beauty of the Greek Islands on our exclusive cruise. Visit iconic destinations like Santorini, Mykonos, and Crete while enjoying luxurious accommodations and world-class cuisine. Our expert guides will take you to hidden gems and must-see attractions, providing a perfect balance of relaxation and adventure.',
  price: 2499,
  duration: 10,
  rating: 4.9,
  groupSize: '12 max',
  image: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg',
  location: 'Greek Islands',
};

// Extended data specific to the detail page
const tourDetails = {
  highlights: [
    'Sunset cruise around Santorini\'s caldera',
    'Private beach access in Mykonos',
    'Wine tasting experience in Crete',
    'Guided tour of ancient ruins in Rhodes',
    'Gourmet dining with local chefs',
    'Luxury yacht transportation between islands'
  ],
  itinerary: [
    { day: 1, title: 'Athens Arrival', description: 'Welcome reception and overnight in Athens' },
    { day: 2, title: 'Mykonos', description: 'Cruise to Mykonos, explore the iconic windmills and enjoy private beach time' },
    { day: 3, title: 'Mykonos', description: 'Full day to explore Mykonos town and optional water activities' },
    { day: 4, title: 'Santorini', description: 'Arrive in Santorini, afternoon wine tasting, sunset dinner in Oia' },
    { day: 5, title: 'Santorini', description: 'Caldera cruise and visit to volcanic hot springs' },
    { day: 6, title: 'Rhodes', description: 'Explore the medieval Old Town and ancient ruins' },
    { day: 7, title: 'Crete', description: 'Visit Knossos Palace and enjoy a cooking class with local chef' },
    { day: 8, title: 'Crete', description: 'Beach day and farewell dinner' },
    { day: 9, title: 'Return to Athens', description: 'Cruise back to Athens with panoramic views' },
    { day: 10, title: 'Departure', description: 'Transfer to airport for departure' },
  ],
  inclusions: [
    'Luxury accommodations throughout the journey',
    'All meals including gourmet experiences',
    'Premium wine and beverages with meals',
    'Private transfers and luxury yacht transportation',
    'Expert local guides for all excursions',
    'All entrance fees to attractions',
    'Personalized concierge service',
    '24/7 emergency support'
  ],
  exclusions: [
    'International airfare',
    'Travel insurance',
    'Personal expenses',
    'Optional activities not listed in the itinerary',
    'Gratuities (recommended but discretionary)'
  ],
  images: [
    'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg',
    'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
    'https://images.pexels.com/photos/1430677/pexels-photo-1430677.jpeg',
    'https://images.pexels.com/photos/2225442/pexels-photo-2225442.jpeg',
    'https://images.pexels.com/photos/356807/pexels-photo-356807.jpeg'
  ],
  reviews: [
    { id: 1, name: 'Emily Thompson', rating: 5, date: '2025-02-15', comment: 'The cruise exceeded all our expectations. The crew was wonderful and the excursions were perfectly organized.' },
    { id: 2, name: 'Michael Chen', rating: 5, date: '2025-02-10', comment: 'A dream vacation. The accommodations were luxurious and the food was incredible. Will definitely book with Wanderluxe again.' },
    { id: 3, name: 'Sarah Johnson', rating: 4, date: '2025-01-28', comment: 'Wonderful trip overall. The only small issue was a delayed departure on day 3, but the company handled it professionally.' }
  ],
  videoUrl: 'https://player.vimeo.com/video/289289202'
};

const TourDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch tour data
    setTimeout(() => {
      setLoading(false);
    }, 500);
    
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === tourDetails.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? tourDetails.images.length - 1 : prevIndex - 1
    );
  };

  const toggleWishlist = () => {
    setWishlist(!wishlist);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-indicator"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero section with image gallery */}
        <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          {/* Main gallery image */}
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-black"
          >
            <img 
              src={tourDetails.images[currentImageIndex]} 
              alt={tourData.title} 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
          </motion.div>
          
          {/* Gallery controls */}
          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4">
            <button 
              onClick={prevImage}
              className="w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white hover:bg-opacity-70 transition"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={nextImage}
              className="w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white hover:bg-opacity-70 transition"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          
          {/* Image counter */}
          <div className="absolute bottom-6 right-6 bg-black bg-opacity-50 px-3 py-1 rounded-full text-white text-sm">
            {currentImageIndex + 1} / {tourDetails.images.length}
          </div>
          
          {/* Tour title and location */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto">
              <div className="flex items-center text-white mb-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-lg">{tourData.location}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
                {tourData.title}
              </h1>
              <div className="flex flex-wrap items-center text-white gap-4 md:gap-8">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{tourData.duration} days</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>All-inclusive</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{tourData.groupSize}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span>{tourData.rating}/5 ({tourDetails.reviews.length} reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left column: Tour details */}
            <div className="lg:w-2/3">
              {/* Navigation tabs */}
              <div className="border-b border-gray-200 mb-8">
                <div className="flex overflow-x-auto hide-scrollbar">
                  <button 
                    onClick={() => setSelectedTab('overview')}
                    className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                      selectedTab === 'overview' 
                        ? 'text-primary-600 border-b-2 border-primary-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Overview
                  </button>
                  <button 
                    onClick={() => setSelectedTab('itinerary')}
                    className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                      selectedTab === 'itinerary' 
                        ? 'text-primary-600 border-b-2 border-primary-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Itinerary
                  </button>
                  <button 
                    onClick={() => setSelectedTab('inclusions')}
                    className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                      selectedTab === 'inclusions' 
                        ? 'text-primary-600 border-b-2 border-primary-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    What's Included
                  </button>
                  <button 
                    onClick={() => setSelectedTab('reviews')}
                    className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                      selectedTab === 'reviews' 
                        ? 'text-primary-600 border-b-2 border-primary-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Reviews
                  </button>
                </div>
              </div>
              
              {/* Tab content */}
              <div className="pb-8">
                {selectedTab === 'overview' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-serif font-bold mb-4">Tour Overview</h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {tourData.description}
                    </p>
                    
                    <h3 className="text-xl font-serif font-bold mb-4">Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-8">
                      {tourDetails.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Embedded video */}
                    <h3 className="text-xl font-serif font-bold mb-4">Tour Video</h3>
                    <div className="aspect-video bg-gray-100 mb-8 rounded-lg overflow-hidden">
                      <iframe
                        src={tourDetails.videoUrl}
                        className="w-full h-full"
                        title="Tour Video"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </motion.div>
                )}
                
                {selectedTab === 'itinerary' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-serif font-bold mb-6">Day-by-Day Itinerary</h2>
                    <div className="space-y-6">
                      {tourDetails.itinerary.map((day) => (
                        <div key={day.day} className="border-l-4 border-primary-200 pl-6 pb-2">
                          <div className="bg-primary-50 inline-block px-3 py-1 rounded-full text-primary-800 text-sm font-medium mb-2">
                            Day {day.day}
                          </div>
                          <h3 className="text-xl font-medium mb-2">{day.title}</h3>
                          <p className="text-gray-700">{day.description}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {selectedTab === 'inclusions' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-serif font-bold mb-6">What's Included</h2>
                    <div className="bg-green-50 rounded-lg p-6 mb-8">
                      <h3 className="text-lg font-medium text-green-800 mb-4">Inclusions</h3>
                      <div className="space-y-2">
                        {tourDetails.inclusions.map((item, index) => (
                          <div key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-gray-800">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-red-50 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-red-800 mb-4">Exclusions</h3>
                      <div className="space-y-2">
                        {tourDetails.exclusions.map((item, index) => (
                          <div key={index} className="flex items-start">
                            <X className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-gray-800">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {selectedTab === 'reviews' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-serif font-bold">Customer Reviews</h2>
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star}
                              className={`h-5 w-5 ${star <= Math.round(tourData.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-lg font-medium">{tourData.rating}</span>
                        <span className="ml-1 text-gray-500">({tourDetails.reviews.length} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {tourDetails.reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-6">
                          <div className="flex justify-between mb-2">
                            <div className="font-medium">{review.name}</div>
                            <div className="text-sm text-gray-500">{review.date}</div>
                          </div>
                          <div className="flex mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star}
                                className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                    
                    <button className="mt-6 px-5 py-2 border border-primary-600 text-primary-600 rounded-full hover:bg-primary-50 transition">
                      Write a Review
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
            
            {/* Right column: Booking widget */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-3xl font-bold">${tourData.price}</span>
                    <span className="text-gray-500 ml-1">per person</span>
                  </div>
                  <button 
                    onClick={toggleWishlist}
                    className={`p-2 rounded-full ${wishlist ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    aria-label="Add to wishlist"
                  >
                    <Heart className={`h-5 w-5 ${wishlist ? 'fill-current' : ''}`} />
                  </button>
                </div>
                
                <BookingForm tourId={parseInt(id || '1')} tourPrice={tourData.price} />
                
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Free cancellation up to 30 days before departure</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Reserve now with only 20% deposit</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>24/7 customer support</span>
                  </div>
                </div>
                
                <div className="mt-6 bg-primary-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <Calendar className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-primary-800">Upcoming Departures</h4>
                      <p className="text-sm text-primary-700 mt-1">
                        Several dates available between March and November 2025. Check availability in the booking form.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Questions about this tour?</h4>
                  <Link to="/contact" className="text-primary-600 hover:text-primary-800 text-sm flex items-center">
                    <span>Contact our travel experts</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TourDetailPage;