import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const Newsletter = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real application, you would submit to an API
      console.log('Email submitted:', email);
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-primary-900 text-white overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary-800 rounded-full opacity-30"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary-800 rounded-full opacity-40"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Join Our Wanderluxe Community
          </h2>
          <p className="text-primary-100 mb-8">
            Subscribe to our newsletter and be the first to know about exclusive journeys, 
            limited offers, and insider travel tips.
          </p>
          
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-primary-800 p-6 rounded-xl"
            >
              <h3 className="text-xl font-medium mb-2">Thank you for subscribing!</h3>
              <p className="text-primary-200">
                Get ready for extraordinary travel inspiration in your inbox.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="relative flex bg-white bg-opacity-10 rounded-full p-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-transparent pl-5 pr-3 py-3 focus:outline-none text-white placeholder:text-primary-200"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white rounded-full font-medium transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-primary-300 text-sm mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;