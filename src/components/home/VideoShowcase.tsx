import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import ReactPlayer from 'react-player/lazy';

// Featured videos data
const featuredVideos = [
  {
    id: 1,
    title: 'The Wonders of Bali',
    description: 'Explore the mystical temples, lush rice terraces, and pristine beaches of Bali.',
    thumbnail: 'https://images.pexels.com/photos/5747135/pexels-photo-5747135.jpeg',
    video: 'https://player.vimeo.com/video/253989945',
    location: 'Bali, Indonesia',
  },
  {
    id: 2,
    title: 'Santorini Sunset Escape',
    description: 'Experience the world-famous sunsets and whitewashed villages of Santorini.',
    thumbnail: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
    video: 'https://player.vimeo.com/video/289289202',
    location: 'Santorini, Greece',
  },
  {
    id: 3,
    title: 'Safari Adventures in Tanzania',
    description: 'Witness the incredible wildlife and breathtaking landscapes of the Serengeti.',
    thumbnail: 'https://images.pexels.com/photos/33045/lion-wild-africa-african.jpg',
    video: 'https://player.vimeo.com/video/214260744',
    location: 'Serengeti, Tanzania',
  }
];

const VideoShowcase = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoSelect = (index: number) => {
    setActiveVideo(index);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 bg-black text-white"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">
            Immersive Travel Experiences
          </h2>
          <div className="w-24 h-1 bg-accent-500 mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Step into the world's most extraordinary destinations through our curated collection of immersive videos.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main video player */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="lg:w-2/3 relative rounded-xl overflow-hidden bg-gray-900 aspect-video"
          >
            {activeVideo !== null ? (
              <>
                <ReactPlayer
                  url={featuredVideos[activeVideo].video}
                  width="100%"
                  height="100%"
                  playing={isPlaying}
                  controls={false}
                  light={false}
                  pip={true}
                />
                <button 
                  onClick={togglePlayPause}
                  className="absolute bottom-4 right-4 w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-xl font-serif text-white mb-1">{featuredVideos[activeVideo].title}</h3>
                  <p className="text-gray-300 text-sm">{featuredVideos[activeVideo].location}</p>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-900 text-gray-400">
                <p className="text-xl">Select a video to play</p>
              </div>
            )}
          </motion.div>
          
          {/* Video thumbnails */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/3 space-y-4"
          >
            {featuredVideos.map((video, index) => (
              <div 
                key={video.id}
                onClick={() => handleVideoSelect(index)}
                className={`p-4 rounded-lg cursor-pointer transition-all ${activeVideo === index ? 'bg-primary-900' : 'bg-gray-900 hover:bg-gray-800'}`}
              >
                <div className="flex gap-4">
                  <div className="w-24 h-16 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{video.title}</h4>
                    <p className="text-gray-400 text-sm line-clamp-2">{video.description}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-4">
              <a 
                href="/tours?videos=true" 
                className="inline-flex items-center text-accent-400 hover:text-accent-300 transition"
              >
                <span>View all video experiences</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;