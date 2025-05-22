import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BarChart3, Users, CreditCard, Map, Video, Compass, Package, Calendar } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

// Mock data for dashboard
const stats = [
  { id: 1, title: 'Total Bookings', value: '1,284', change: '+12%', icon: Package, color: 'bg-primary-500' },
  { id: 2, title: 'Active Users', value: '3,427', change: '+8%', icon: Users, color: 'bg-accent-500' },
  { id: 3, title: 'Revenue', value: '$287,492', change: '+23%', icon: CreditCard, color: 'bg-secondary-500' },
  { id: 4, title: 'Total Tours', value: '42', change: '+4', icon: Compass, color: 'bg-success-500' },
];

const recentBookings = [
  { id: 1, user: 'Emma Watson', tour: 'Greek Islands Luxury Cruise', date: '2025-04-15', amount: '$2,499', status: 'Confirmed' },
  { id: 2, user: 'James Rodriguez', tour: 'Peruvian Highlands Expedition', date: '2025-05-02', amount: '$2,899', status: 'Pending' },
  { id: 3, user: 'Lin Chen', tour: 'Japanese Cherry Blossom Tour', date: '2025-04-10', amount: '$3,299', status: 'Confirmed' },
  { id: 4, user: 'Aisha Patel', tour: 'Safari Adventures in Tanzania', date: '2025-06-20', amount: '$4,150', status: 'Confirmed' },
  { id: 5, user: 'Michael Brown', tour: 'Amalfi Coast Private Tour', date: '2025-05-15', amount: '$3,750', status: 'Pending' },
];

const AdminDashboardPage = () => {
  const [dateRange, setDateRange] = useState('month');

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Overview of your business performance and recent activity</p>
          </div>
          <div className="flex space-x-2">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
              <option value="quarter">Last 90 days</option>
              <option value="year">Last year</option>
            </select>
          </div>
        </div>

        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 mb-1">{stat.title}</p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <span className="text-sm text-success-700">{stat.change}</span>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/admin/tours" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Manage Tours</h3>
              <Map className="h-5 w-5 text-primary-500" />
            </div>
            <p className="text-gray-600 mb-4">Add, edit, or remove tour packages and manage availability</p>
            <span className="text-primary-600 font-medium">View tours &rarr;</span>
          </Link>
          
          <Link to="/admin/videos" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Promotional Videos</h3>
              <Video className="h-5 w-5 text-primary-500" />
            </div>
            <p className="text-gray-600 mb-4">Upload and manage promotional videos for destinations</p>
            <span className="text-primary-600 font-medium">Manage videos &rarr;</span>
          </Link>
          
          <Link to="/admin/bookings" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Bookings</h3>
              <Calendar className="h-5 w-5 text-primary-500" />
            </div>
            <p className="text-gray-600 mb-4">View and manage customer bookings and reservations</p>
            <span className="text-primary-600 font-medium">View bookings &rarr;</span>
          </Link>
        </div>

        {/* Recent bookings */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">Recent Bookings</h2>
            <Link to="/admin/bookings" className="text-primary-600 hover:text-primary-700 font-medium">
              View all
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">{booking.user}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{booking.tour}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{booking.date}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{booking.amount}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        booking.status === 'Confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Analytics preview */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">Booking Trends</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-primary-50 text-primary-700 rounded-md">Daily</button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md">Weekly</button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md">Monthly</button>
            </div>
          </div>
          
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Analytics chart visualization</p>
              <p className="text-gray-400 text-sm">(This would contain a real chart in production)</p>
            </div>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;