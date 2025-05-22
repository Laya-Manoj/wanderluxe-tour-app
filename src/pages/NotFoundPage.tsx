import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-100 flex items-center justify-center px-4"
    >
      <div className="max-w-lg w-full text-center">
        <h1 className="text-9xl font-bold text-gray-900">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-8">
          Page Not Found
        </h2>
        <p className="text-gray-600 mt-4">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full mt-8 hover:bg-gray-800 transition-colors duration-300"
        >
          <Home size={20} />
          Return Home
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;