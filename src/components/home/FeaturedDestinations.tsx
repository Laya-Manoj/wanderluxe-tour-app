import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const destinations = [
  {
    id: 1,
    title: 'Santorini',
    subtitle: 'Greece',
    image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
  },
  {
    id: 2,
    title: 'Bali',
    subtitle: 'Indonesia',
    image: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg',
  },
  {
    id: 3,
    title: 'Kyoto',
    subtitle: 'Japan',
    image: 'https://images.pexels.com/photos/5759545/pexels-photo-5759545.jpeg',
  },
  {
    id: 4,
    title: 'Machu Picchu',
    subtitle: 'Peru',
    image: 'https://images.pexels.com/photos/2105079/pexels-photo-2105079.jpeg',
  }
];

const FeaturedDestinations = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section 
      ref={sectionRef} 
      id="content-section"
      className="py-16 md:py-24 bg-white"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">
            Featured Destinations
          </h2>
          <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of the world's most extraordinary destinations, 
            where luxury meets authentic experiences.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {destinations.map((destination) => (
            <motion.div 
              key={destination.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-lg shadow-lg card-hover"
            >
              <div className="aspect-[3/4] w-full">
                <img 
                  src={destination.image} 
                  alt={destination.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-2xl font-serif text-white font-bold">{destination.title}</h3>
                <p className="text-white text-opacity-80 mb-4">{destination.subtitle}</p>
                <Link 
                  to={`/tours?destination=${destination.title.toLowerCase()}`}
                  className="inline-block py-2 px-4 bg-white text-primary-800 rounded-full text-sm font-medium transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                >
                  Explore Tours
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;