import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, ChevronRight, MapPin } from 'lucide-react';
import { toursData, AdminTour } from '../../data/toursData';

const FeaturedTours = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [publishedTours, setPublishedTours] = useState<AdminTour[]>(
    toursData.filter(tour => tour.status === 'published')
  );

  // Watch for changes in the data version to re-render
  useEffect(() => {
    const interval = setInterval(() => {
      setPublishedTours(toursData.filter(tour => tour.status === 'published'));
    }, 1000); // Check every second for updates

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">
              Featured Tours
            </h2>
            <div className="w-24 h-1 bg-accent-500 mb-6"></div>
            <p className="text-gray-600 max-w-2xl">
              Explore our most popular luxury tours, carefully crafted to deliver 
              unforgettable experiences with personalized service.
            </p>
          </div>
          <Link 
            to="/tours" 
            className="mt-6 md:mt-0 inline-flex items-center text-primary-600 hover:text-primary-800 transition-colors font-medium"
          >
            View all tours
            <ChevronRight className="ml-1 h-5 w-5" />
          </Link>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedTours.slice(0, 3).map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg card-hover"
            >
              <div className="relative">
                <img 
                  src={tour.image} 
                  alt={tour.title} 
                  className="w-full h-60 object-cover"
                />
                <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full flex items-center">
                  <Star className="h-4 w-4 text-amber-500 mr-1" />
                  <span className="text-sm font-medium">{tour.rating}</span>
                </div>
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full flex items-center">
                  <span className="text-sm font-medium">${tour.price}</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {tour.location}
                </div>
                
                <h3 className="text-xl font-serif font-bold mb-3">{tour.title}</h3>
                <p className="text-gray-600 mb-5 line-clamp-2">{tour.description}</p>
                
                <div className="flex justify-between items-center mb-5 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {tour.duration} days
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {tour.groupSize}
                  </div>
                </div>
                
                <Link
                  to={`/tours/${tour.id}`}
                  className="block w-full py-3 text-center rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;