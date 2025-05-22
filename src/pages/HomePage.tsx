import { useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Hero from '../components/home/Hero';
import FeaturedDestinations from '../components/home/FeaturedDestinations';
import FeaturedTours from '../components/home/FeaturedTours';
import VideoShowcase from '../components/home/VideoShowcase';
import ExperienceSection from '../components/home/ExperienceSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import Newsletter from '../components/home/Newsletter';
import Footer from '../components/common/Footer';

const HomePage = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div 
      ref={mainRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-hidden"
    >
      <Navbar transparent={true} />
      <Hero />
      <FeaturedDestinations />
      <ExperienceSection />
      <FeaturedTours />
      <VideoShowcase />
      <TestimonialsSection />
      <Newsletter />
      <Footer />
    </motion.div>
  );
};

export default HomePage;