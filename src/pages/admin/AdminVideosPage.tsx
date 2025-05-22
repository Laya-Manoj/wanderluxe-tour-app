import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Plus, Search, MoreVertical, Edit, Trash2, UploadCloud, X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

// Mock videos data
const initialVideos = [
  {
    id: 1,
    title: 'The Wonders of Bali',
    description: 'Explore the mystical temples, lush rice terraces, and pristine beaches of Bali.',
    thumbnail: 'https://images.pexels.com/photos/5747135/pexels-photo-5747135.jpeg',
    videoUrl: 'https://player.vimeo.com/video/253989945',
    location: 'Bali, Indonesia',
    duration: '2:45',
    featured: true,
    published: true,
    uploadDate: '2025-02-15',
  },
  {
    id: 2,
    title: 'Santorini Sunset Escape',
    description: 'Experience the world-famous sunsets and whitewashed villages of Santorini.',
    thumbnail: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
    videoUrl: 'https://player.vimeo.com/video/289289202',
    location: 'Santorini, Greece',
    duration: '3:12',
    featured: true,
    published: true,
    uploadDate: '2025-02-28',
  },
  {
    id: 3,
    title: 'Safari Adventures in Tanzania',
    description: 'Witness the incredible wildlife and breathtaking landscapes of the Serengeti.',
    thumbnail: 'https://images.pexels.com/photos/33045/lion-wild-africa-african.jpg',
    videoUrl: 'https://player.vimeo.com/video/214260744',
    location: 'Serengeti, Tanzania',
    duration: '4:05',
    featured: false,
    published: true,
    uploadDate: '2025-03-10',
  },
  {
    id: 4,
    title: 'The Northern Lights Experience',
    description: 'Witness the magical aurora borealis dancing across the Arctic sky.',
    thumbnail: 'https://images.pexels.com/photos/2113554/pexels-photo-2113554.jpeg',
    videoUrl: 'https://player.vimeo.com/video/174512397',
    location: 'Iceland',
    duration: '3:35',
    featured: false,
    published: true,
    uploadDate: '2025-03-05',
  },
  {
    id: 5,
    title: 'Kyoto: City of Temples',
    description: 'Discover the ancient temples and traditional culture of Kyoto.',
    thumbnail: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg',
    videoUrl: 'https://player.vimeo.com/video/305164453',
    location: 'Kyoto, Japan',
    duration: '2:50',
    featured: false,
    published: false,
    uploadDate: '2025-03-15',
  },
];

const AdminVideosPage = () => {
  const [videos, setVideos] = useState(initialVideos);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [filter, setFilter] = useState('all');
  
  // New video form state
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    videoUrl: '',
    location: '',
    featured: false,
    published: true,
  });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setNewVideo({
      ...newVideo,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would upload the file and get a URL
    const newVideoEntry = {
      id: videos.length + 1,
      ...newVideo,
      thumbnail: thumbnailPreview || 'https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg',
      duration: '3:00', // Placeholder
      uploadDate: new Date().toISOString().split('T')[0],
    };
    
    setVideos([newVideoEntry, ...videos]);
    setShowUploadModal(false);
    resetForm();
  };

  const resetForm = () => {
    setNewVideo({
      title: '',
      description: '',
      videoUrl: '',
      location: '',
      featured: false,
      published: true,
    });
    setThumbnailFile(null);
    setThumbnailPreview(null);
  };

  const toggleFeatured = (id: number) => {
    setVideos(videos.map(video => 
      video.id === id ? { ...video, featured: !video.featured } : video
    ));
  };

  const togglePublished = (id: number) => {
    setVideos(videos.map(video => 
      video.id === id ? { ...video, published: !video.published } : video
    ));
  };

  const deleteVideo = (id: number) => {
    if (confirm('Are you sure you want to delete this video?')) {
      setVideos(videos.filter(video => video.id !== id));
    }
  };

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          video.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'featured') return matchesSearch && video.featured;
    if (filter === 'published') return matchesSearch && video.published;
    if (filter === 'draft') return matchesSearch && !video.published;
    
    return matchesSearch;
  });

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2">Promotional Videos</h1>
            <p className="text-gray-600">Manage your destination videos and promotional content</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
          >
            <Plus className="h-5 w-5 mr-2" />
            Upload Video
          </button>
        </div>

        {/* Filters and search */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="flex space-x-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Videos</option>
                <option value="featured">Featured</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
              </select>
            </div>
          </div>
        </div>

        {/* Videos grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div key={video.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Play className="h-12 w-12 text-white" />
                </div>
                {video.featured && (
                  <div className="absolute top-3 left-3 bg-accent-500 text-white px-2 py-1 text-xs rounded-md">
                    Featured
                  </div>
                )}
                {!video.published && (
                  <div className="absolute top-3 right-3 bg-gray-700 text-white px-2 py-1 text-xs rounded-md">
                    Draft
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium truncate">{video.title}</h3>
                  <div className="relative">
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                    {/* Dropdown menu would go here */}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>
                
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>{video.location}</span>
                  <span>{video.duration}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Uploaded on {video.uploadDate}</span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => toggleFeatured(video.id)}
                      className={`p-1 rounded ${video.featured ? 'text-accent-600 bg-accent-50' : 'text-gray-400 hover:text-gray-600'}`}
                      title={video.featured ? "Remove from featured" : "Add to featured"}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    </button>
                    
                    <button 
                      onClick={() => togglePublished(video.id)}
                      className={`p-1 rounded ${video.published ? 'text-success-600 bg-success-50' : 'text-gray-400 hover:text-gray-600'}`}
                      title={video.published ? "Unpublish" : "Publish"}
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    </button>
                    
                    <button 
                      onClick={() => deleteVideo(video.id)}
                      className="p-1 text-gray-400 hover:text-error-600 rounded"
                      title="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredVideos.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-gray-100 rounded-full mb-4">
              <Play className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium mb-2">No videos found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm 
                ? `No videos match "${searchTerm}"`
                : "You haven't added any videos yet."
              }
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilter('all');
                setShowUploadModal(true);
              }}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
            >
              Upload Your First Video
            </button>
          </div>
        )}
        
        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen p-4">
              <div className="fixed inset-0 bg-black opacity-30" onClick={() => setShowUploadModal(false)}></div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg relative z-10"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-medium">Upload New Video</h3>
                  <button 
                    onClick={() => setShowUploadModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    {/* Thumbnail upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Video Thumbnail
                      </label>
                      <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          {thumbnailPreview ? (
                            <div className="relative">
                              <img 
                                src={thumbnailPreview} 
                                alt="Thumbnail preview" 
                                className="mx-auto h-40 object-cover rounded"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setThumbnailFile(null);
                                  setThumbnailPreview(null);
                                }}
                                className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 text-white"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="thumbnail-upload"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500"
                                >
                                  <span>Upload a file</span>
                                  <input
                                    id="thumbnail-upload"
                                    name="thumbnail"
                                    type="file"
                                    className="sr-only"
                                    accept="image/*"
                                    onChange={handleThumbnailChange}
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Title */}
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={newVideo.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                    
                    {/* Description */}
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={newVideo.description}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                    
                    {/* Video URL */}
                    <div>
                      <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                        Video URL (YouTube, Vimeo, etc.)
                      </label>
                      <input
                        type="url"
                        id="videoUrl"
                        name="videoUrl"
                        value={newVideo.videoUrl}
                        onChange={handleInputChange}
                        placeholder="https://..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                    
                    {/* Location */}
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={newVideo.location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                    
                    {/* Options */}
                    <div className="flex space-x-6">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="featured"
                          name="featured"
                          checked={newVideo.featured}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                          Featured video
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="published"
                          name="published"
                          checked={newVideo.published}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
                          Publish immediately
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowUploadModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                    >
                      Upload Video
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </AdminLayout>
  );
};

export default AdminVideosPage;