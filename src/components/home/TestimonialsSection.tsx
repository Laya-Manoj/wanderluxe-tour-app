import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Emily Johnson',
    title: 'Travel Enthusiast',
    quote: 'Wanderluxe transformed our honeymoon into an unforgettable adventure. The attention to detail and personalized service exceeded our expectations.',
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg'
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Photographer',
    quote: 'As someone who travels to capture the perfect shot, I was blown away by the unique locations and authentic experiences Wanderluxe provided.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
  },
  {
    id: 3,
    name: 'Sophia Rodriguez',
    title: 'Food Critic',
    quote: 'The culinary experiences on my Wanderluxe tour were exceptional. They connected me with local chefs and hidden gems I would never have found on my own.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
  }
];

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 bg-primary-50"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">
            What Our Travelers Say
          </h2>
          <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover why adventurers around the world choose Wanderluxe for their most memorable journeys.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              className="bg-white rounded-xl p-8 shadow-md relative"
            >
              <Quote className="absolute top-6 right-6 h-12 w-12 text-primary-100" />
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-lg">{testimonial.name}</h4>
                  <p className="text-gray-500">{testimonial.title}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">{testimonial.quote}</p>
              <div className="flex mt-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    className="h-5 w-5 text-yellow-500" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;