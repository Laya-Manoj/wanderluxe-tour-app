import { Link } from 'react-router-dom'; 
import { Clock, Users, Star, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Tour {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  place: string;
  maxPeople: number;
  image: string;
  rating: number;
  groupSize: number;
  location: string;
}

interface TourCardProps {
  tour: Tour;
  index: number;
}

const TourCard = ({ tour, index }: TourCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
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
  );
};

export default TourCard;