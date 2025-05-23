import React, { useState, useEffect } from 'react';

// Define the Tour type to match the AdminTour interface, excluding admin-specific fields
interface Tour {
  title: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  rating: number;
  groupSize: number;
  location: string;
  place: string;
  maxPeople: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (tour: Tour) => void;
  editData?: Tour | null;
}

const TourFormModal: React.FC<Props> = ({ open, onClose, onSave, editData }) => {
  const [formData, setFormData] = useState<Tour>({
    title: '',
    description: '',
    price: 0,
    duration: '',
    image: '',
    rating: 0,
    groupSize: 1,
    location: '',
    place: '',
    maxPeople: 1,
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({
        title: '',
        description: '',
        price: 0,
        duration: '',
        image: '',
        rating: 0,
        groupSize: 1,
        location: '',
        place: '',
        maxPeople: 1,
      });
    }
  }, [editData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'rating' || name === 'groupSize' || name === 'maxPeople' ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4 w-full max-w-md">
        <h2 className="text-xl font-serif font-bold">{editData ? 'Edit Tour' : 'Add New Tour'}</h2>
        
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Tour Title</label>
            <input
              name="title"
              placeholder="Tour Title"
              value={formData.title}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 min-h-[100px]"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Place (if different from location)</label>
            <input
              name="place"
              placeholder="Place (if different from location)"
              value={formData.place}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              name="price"
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Duration (days)</label>
            <input
              name="duration"
              placeholder="Duration (e.g., '7')"
              value={formData.duration}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Rating (0-5)</label>
            <input
              name="rating"
              type="number"
              step="0.1"
              placeholder="Rating (0-5)"
              value={formData.rating}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Group Size</label>
            <input
              name="groupSize"
              type="number"
              placeholder="Group Size"
              value={formData.groupSize}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Max People</label>
            <input
              name="maxPeople"
              type="number"
              placeholder="Max People"
              value={formData.maxPeople}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourFormModal;