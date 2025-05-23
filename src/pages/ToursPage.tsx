import { motion } from 'framer-motion';
import TourCard from '../components/tours/TourCard';
import { toursData, AdminTour } from '../data/toursData';

const ToursPage = () => {
  // Filter only published tours for users
  const publishedTours = toursData.filter(tour => tour.status === 'published');

  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-serif font-bold text-center mb-8">Explore Our Tours</h1>
        <p className="text-gray-600 text-center mb-12">Discover amazing adventures around the world</p>

        {publishedTours.length === 0 ? (
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">No tours available</h3>
            <p className="text-gray-500">Check back later for exciting new tours!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedTours.map((tour: AdminTour, index: number) => (
              <TourCard key={tour.id} tour={tour} index={index} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ToursPage;