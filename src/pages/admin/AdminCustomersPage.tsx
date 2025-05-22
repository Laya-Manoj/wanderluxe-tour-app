import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search,  Mail, Phone, MapPin, MoreVertical, User, Calendar } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

// Mock customer data
const customers = [
  {
    id: 1,
    name: 'Emma Watson',
    email: 'emma.watson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'London, UK',
    joinDate: '2025-01-15',
    totalBookings: 3,
    totalSpent: 8747,
    status: 'active',
    lastBooking: '2025-03-10'
  },
  {
    id: 2,
    name: 'James Rodriguez',
    email: 'james.r@example.com',
    phone: '+1 (555) 234-5678',
    location: 'New York, USA',
    joinDate: '2025-02-01',
    totalBookings: 2,
    totalSpent: 5798,
    status: 'active',
    lastBooking: '2025-03-05'
  },
  {
    id: 3,
    name: 'Lin Chen',
    email: 'lin.chen@example.com',
    phone: '+1 (555) 345-6789',
    location: 'Singapore',
    joinDate: '2025-02-15',
    totalBookings: 1,
    totalSpent: 3299,
    status: 'active',
    lastBooking: '2025-02-28'
  },
  {
    id: 4,
    name: 'Aisha Patel',
    email: 'aisha.p@example.com',
    phone: '+1 (555) 456-7890',
    location: 'Dubai, UAE',
    joinDate: '2025-01-20',
    totalBookings: 4,
    totalSpent: 12450,
    status: 'active',
    lastBooking: '2025-03-12'
  },
  {
    id: 5,
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    phone: '+1 (555) 567-8901',
    location: 'Sydney, Australia',
    joinDate: '2025-02-10',
    totalBookings: 2,
    totalSpent: 6249,
    status: 'inactive',
    lastBooking: '2025-02-20'
  }
];

const AdminCustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && customer.status === statusFilter;
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
            <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2">Customers</h1>
            <p className="text-gray-600">Manage your customer database</p>
          </div>
          <div className="flex space-x-2">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="recent">Most Recent</option>
              <option value="bookings">Most Bookings</option>
              <option value="spent">Highest Spent</option>
            </select>
          </div>
        </div>

        {/* Filters and search */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Customer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium">{customer.name}</h3>
                      <p className="text-sm text-gray-500">ID: #{customer.id}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{customer.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span>Joined {customer.joinDate}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-gray-500">Total Bookings</p>
                      <p className="font-medium">{customer.totalBookings}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total Spent</p>
                      <p className="font-medium">${customer.totalSpent}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        customer.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {customer.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <User className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No customers found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </motion.div>
    </AdminLayout>
  );
};

export default AdminCustomersPage;