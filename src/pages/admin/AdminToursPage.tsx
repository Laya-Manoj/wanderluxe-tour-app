import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Grid2X2, 
  List, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  Users,
  MapPin,
  Clock
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { AdminTour, toursData } from '../../data/toursData';
import TourFormModal from './TourFormModal';

// Simple counter to force re-renders across components (mocking a state management solution)
let dataVersion = 0;
export const getDataVersion = () => dataVersion;
export const incrementDataVersion = () => {
  dataVersion += 1;
};

const AdminToursPage = () => {
  const [tours, setTours] = useState<AdminTour[]>(toursData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<AdminTour | null>(null);

  const updateTours = (updatedTours: AdminTour[]) => {
    if (!Array.isArray(updatedTours)) {
      console.error('updateTours received invalid data:', updatedTours);
      return;
    }

    try {
      // Update the shared data
      toursData.length = 0;
      toursData.push(...updatedTours);
      
      // Update local state to trigger re-render
      setTours([...updatedTours]);
      
      // Increment the data version to notify other components
      incrementDataVersion();
    } catch (error) {
      console.error('Error updating tours:', error);
    }
  };

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tour.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'published') return matchesSearch && tour.status === 'published';
    if (filter === 'draft') return matchesSearch && tour.status === 'draft';
    if (filter === 'limited') return matchesSearch && tour.availability === 'limited';
    
    return matchesSearch;
  });

  const toggleTourStatus = (id: number) => {
    const updatedTours = tours.map(tour => {
      if (tour.id === id) {
        return {
          ...tour,
          status: tour.status === 'published' ? 'draft' as const : 'published' as const
        };
      }
      return tour;
    }) as AdminTour[];
    updateTours(updatedTours);
  };

  const deleteTour = (id: number) => {
    if (confirm('Are you sure you want to delete this tour?')) {
      const updatedTours = tours.filter(tour => tour.id !== id) as AdminTour[];
      updateTours(updatedTours);
    }
  };

  const handleAddTour = (newTour: Omit<AdminTour, 'id' | 'status' | 'availability' | 'lastUpdated' | 'totalBookings'>) => {
    const today = new Date().toISOString().includes('T')
      ? new Date().toISOString().split('T')[0]
      : new Date().toISOString();
    const addedTour: AdminTour = {
      ...newTour,
      id: tours.length + 1,
      status: 'draft' as const, // Explicitly set as literal type
      availability: 'available',
      lastUpdated: today,
      totalBookings: 0,
      place: newTour.location,
      maxPeople: newTour.groupSize,
    };
    const updatedTours = [...tours, addedTour] as AdminTour[];
    updateTours(updatedTours);
  };

  const handleEditTour = (updatedTour: Omit<AdminTour, 'id' | 'status' | 'availability' | 'lastUpdated' | 'totalBookings'>) => {
    if (!editingTour) return;
    const today = new Date().toISOString().includes('T')
      ? new Date().toISOString().split('T')[0]
      : new Date().toISOString();
    const updatedTours = tours.map(tour => {
      if (tour.id === editingTour.id) {
        return {
          ...tour,
          ...updatedTour,
          lastUpdated: today,
          place: updatedTour.location,
          maxPeople: updatedTour.groupSize,
        };
      }
      return tour;
    }) as AdminTour[];
    updateTours(updatedTours);
    setEditingTour(null);
  };

  const openEditModal = (tour: AdminTour) => {
    setEditingTour(tour);
    setIsModalOpen(true);
  };

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2">Tour Packages</h1>
            <p className="text-gray-600">Manage your tour packages and availability</p>
          </div>
          <button
            onClick={() => {
              setEditingTour(null);
              setIsModalOpen(true);
            }}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Tour
          </button>
        </div>

        {/* Filters and search */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search tours..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                >
                  <Filter className="h-5 w-5 mr-2 text-gray-500" />
                  Filter
                </button>
                
                {isFilterOpen && (
                  <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setFilter('all');
                          setIsFilterOpen(false);
                        }}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          filter === 'all' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        All Tours
                      </button>
                      <button
                        onClick={() => {
                          setFilter('published');
                          setIsFilterOpen(false);
                        }}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          filter === 'published' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Published Only
                      </button>
                      <button
                        onClick={() => {
                          setFilter('draft');
                          setIsFilterOpen(false);
                        }}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          filter === 'draft' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Drafts Only
                      </button>
                      <button
                        onClick={() => {
                          setFilter('limited');
                          setIsFilterOpen(false);
                        }}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          filter === 'limited' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Limited Availability
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex space-x-2 self-end md:self-auto">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid'
                    ? 'bg-gray-200 text-gray-800'
                    : 'bg-white text-gray-500 hover:bg-gray-100'
                } rounded-md`}
              >
                <Grid2X2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list'
                    ? 'bg-gray-200 text-gray-800'
                    : 'bg-white text-gray-500 hover:bg-gray-100'
                } rounded-md`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tours display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative">
                  <img 
                    src={tour.image} 
                    alt={tour.title}
                    className="w-full h-48 object-cover" 
                  />
                  {tour.status === 'draft' && (
                    <div className="absolute top-3 left-3 bg-gray-700 text-white px-2 py-1 text-xs rounded-md">
                      Draft
                    </div>
                  )}
                  <div className={`absolute top-3 right-3 px-2 py-1 text-xs rounded-md ${
                    tour.availability === 'available' 
                      ? 'bg-success-500 text-white' 
                      : tour.availability === 'limited' 
                        ? 'bg-warning-500 text-white' 
                        : 'bg-error-500 text-white'
                  }`}>
                    {tour.availability === 'available' 
                      ? 'Available' 
                      : tour.availability === 'limited' 
                        ? 'Limited' 
                        : 'Sold Out'}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium truncate">{tour.title}</h3>
                    <div className="relative">
                      <button className="text-gray-500 hover:text-gray-700">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{tour.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {tour.location}
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {tour.duration} days
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      {tour.groupSize}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold">${tour.price}</span>
                    <span className="text-sm text-gray-500">
                      {tour.totalBookings} bookings
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => toggleTourStatus(tour.id)}
                        className={`p-1 rounded ${
                          tour.status === 'published' 
                            ? 'text-success-600 hover:bg-success-50' 
                            : 'text-gray-400 hover:text-success-600'
                        }`}
                        title={tour.status === 'published' ? "Unpublish" : "Publish"}
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      
                      <button 
                        onClick={() => openEditModal(tour)}
                        className="p-1 text-gray-400 hover:text-primary-600 rounded"
                        title="Edit"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      
                      <button 
                        onClick={() => deleteTour(tour.id)}
                        className="p-1 text-gray-400 hover:text-error-600 rounded"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <span className="text-xs text-gray-500 self-end">
                      Updated {tour.lastUpdated}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tour
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bookings
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTours.map((tour) => (
                  <tr key={tour.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img 
                            className="h-10 w-10 rounded-md object-cover" 
                            src={tour.image} 
                            alt={tour.title} 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{tour.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">{tour.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${tour.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{tour.duration} days</div>
                      <div className="text-sm text-gray-500">{tour.groupSize}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{tour.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        tour.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {tour.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                      <div className="mt-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          tour.availability === 'available' 
                            ? 'bg-green-100 text-green-800' 
                            : tour.availability === 'limited' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {tour.availability === 'available' 
                            ? 'Available' 
                            : tour.availability === 'limited' 
                              ? 'Limited' 
                              : 'Sold Out'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {tour.totalBookings}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => toggleTourStatus(tour.id)}
                          className={`p-1 rounded ${
                            tour.status === 'published' 
                              ? 'text-success-600 hover:bg-success-50' 
                              : 'text-gray-400 hover:text-success-600'
                          }`}
                          title={tour.status === 'published' ? "Unpublish" : "Publish"}
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        
                        <button 
                          onClick={() => openEditModal(tour)}
                          className="p-1 text-gray-400 hover:text-primary-600 rounded"
                          title="Edit"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        
                        <button 
                          onClick={() => deleteTour(tour.id)}
                          className="p-1 text-gray-400 hover:text-error-600 rounded"
                          title="Delete"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredTours.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-gray-500">No tours found matching your filters</p>
              </div>
            )}
          </div>
        )}
        
        {filteredTours.length === 0 && searchTerm === '' && filter === 'all' && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-gray-100 rounded-full mb-4">
              <MapPin className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium mb-2">No tours available</h3>
            <p className="text-gray-500 mb-4">
              You haven't created any tours yet
            </p>
            <button
              onClick={() => {
                setEditingTour(null);
                setIsModalOpen(true);
              }}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
            >
              Create Your First Tour
            </button>
          </div>
        )}
      </motion.div>

      {/* Tour Form Modal */}
      <TourFormModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTour(null);
        }}
        onSave={editingTour ? handleEditTour : handleAddTour}
        editData={editingTour}
      />
    </AdminLayout>
  );
};

export default AdminToursPage;