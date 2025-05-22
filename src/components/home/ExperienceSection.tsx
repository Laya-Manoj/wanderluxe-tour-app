import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Compass, Shield, Heart, Users } from 'lucide-react';

const features = [
  {
    id: 1,
    title: 'Expertly Curated',
    description: 'Our travel experts personally visit every destination to ensure exceptional quality and unique experiences.',
    icon: Compass,
  },
  {
    id: 2,
    title: 'Premium Protection',
    description: 'Travel with peace of mind with our comprehensive insurance and 24/7 emergency assistance.',
    icon: Shield,
  },
  {
    id: 3,
    title: 'Personalized Service',
    description: 'Every journey is tailored to your preferences, with dedicated concierge support throughout your trip.',
    icon: Heart,
  },
  {
    id: 4,
    title: 'Small Group Sizes',
    description: 'We limit our groups to ensure personalized attention and authentic local experiences.',
    icon: Users,
  }
];

const ExperienceSection = () => {
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">
            The Wanderluxe Experience
          </h2>
          <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We don't just plan trips, we craft extraordinary journeys that blend luxury, 
            authenticity, and unforgettable moments.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            
            return (
              <motion.div 
                key={feature.id} 
                variants={itemVariants}
                className="bg-white rounded-xl p-8 shadow-lg flex items-start"
              >
                <div className="mr-5 bg-primary-50 p-3 rounded-lg">
                  <Icon className="w-7 h-7 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a 
            href="/about" 
            className="inline-block px-8 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors shadow-md"
          >
            Learn About Our Approach
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;