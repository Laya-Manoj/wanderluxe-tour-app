import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    video.play().catch(error => {
      console.error("Autoplay prevented:", error);
    });
    
    return () => {
      if (video) {
        video.pause();
      }
    };
  }, []);

  const scrollToContent = () => {
    const contentSection = document.getElementById('content-section');
    contentSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div 
      ref={containerRef} 
      className="relative h-screen overflow-hidden"
    >
      <motion.div
        style={{ opacity, scale, y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
        
        <video 
          ref={videoRef}
          className="absolute w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-shore-with-a-lighthouse-34693-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
      
      <div className="relative h-full flex flex-col justify-center items-center text-white z-10 px-4">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-center leading-tight mb-6"
        >
          Discover the World's <br />
          <span className="text-accent-400">Extraordinary Destinations</span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-xl md:text-2xl text-center max-w-2xl mb-8"
        >
          Curated luxury experiences for the modern explorer
        </motion.p>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <button 
            className="px-8 py-3 bg-accent-500 rounded-full text-white hover:bg-accent-600 transition-colors duration-300 font-medium"
            onClick={scrollToContent}
          >
            Explore Tours
          </button>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-10 animate-bounce cursor-pointer"
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <ArrowDown className="w-8 h-8" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;