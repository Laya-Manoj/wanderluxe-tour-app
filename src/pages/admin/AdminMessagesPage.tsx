import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, MoreVertical, Send, Paperclip, User, Mail } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

// Mock messages data
const messages = [
  {
    id: 1,
    sender: 'Emma Watson',
    email: 'emma.watson@example.com',
    subject: 'Question about Greek Islands Tour',
    message: 'Hi, Im interested in the Greek Islands Luxury Cruise but have some questions about the itinerary...',
    date: '2025-03-15 09:30',
    status: 'unread',
    starred: false
  },
  {
    id: 2,
    sender: 'James Rodriguez',
    email: 'james.r@example.com',
    subject: 'Booking Confirmation Request',
    message: 'Could you please confirm my booking for the Peruvian Highlands Expedition? I havent received...',
    date: '2025-03-14 15:45',
    status: 'read',
    starred: true
  },
  {
    id: 3,
    sender: 'Lin Chen',
    email: 'lin.chen@example.com',
    subject: 'Special Dietary Requirements',
    message: 'Im booked for the Japanese Cherry Blossom Tour and need to inform about my dietary restrictions...',
    date: '2025-03-14 11:20',
    status: 'replied',
    starred: false
  },
  {
    id: 4,
    sender: 'Aisha Patel',
    email: 'aisha.p@example.com',
    subject: 'Safari Tour Inquiry',
    message: 'Hello, I would like to know more about the photography opportunities during the Safari Adventures tour...',
    date: '2025-03-13 16:15',
    status: 'unread',
    starred: false
  },
  {
    id: 5,
    sender: 'Michael Brown',
    email: 'michael.b@example.com',
    subject: 'Cancellation Policy',
    message: 'Can you please provide more information about your cancellation policy? Im considering booking...',
    date: '2025-03-13 14:30',
    status: 'read',
    starred: false
  }
];

const AdminMessagesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'unread') return matchesSearch && message.status === 'unread';
    if (filter === 'starred') return matchesSearch && message.starred;
    return matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread':
        return 'bg-primary-100 text-primary-800';
      case 'replied':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    // Here you would typically send the reply to your backend
    console.log('Sending reply:', replyText);
    setReplyText('');
  };

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-[calc(100vh-6rem)]"
      >
        <div className="flex h-full">
          {/* Messages list */}
          <div className="w-full lg:w-1/2 xl:w-2/5 bg-white rounded-l-xl shadow-md overflow-hidden border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-serif font-bold">Messages</h1>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                >
                  <option value="all">All Messages</option>
                  <option value="unread">Unread</option>
                  <option value="starred">Starred</option>
                </select>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div className="overflow-y-auto h-[calc(100%-5rem)]">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message.id)}
                  className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                    selectedMessage === message.id ? 'bg-primary-50' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium">{message.sender}</h3>
                        <p className="text-xs text-gray-500">{message.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // Toggle star status
                        }}
                        className={`mr-2 ${message.starred ? 'text-yellow-400' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        <Star className="h-4 w-4" />
                      </button>
                      <span className="text-xs text-gray-500">{message.date.split(' ')[1]}</span>
                    </div>
                  </div>
                  <h4 className="text-sm font-medium mb-1">{message.subject}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(message.status)}`}>
                      {message.status}
                    </span>
                  </div>
                </div>
              ))}

              {filteredMessages.length === 0 && (
                <div className="p-8 text-center">
                  <Mail className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No messages found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Message detail */}
          <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col bg-white rounded-r-xl shadow-md">
            {selectedMessage ? (
              <>
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-medium mb-1">
                        {messages.find(m => m.id === selectedMessage)?.subject}
                      </h2>
                      <p className="text-sm text-gray-500">
                        From: {messages.find(m => m.id === selectedMessage)?.sender} 
                        ({messages.find(m => m.id === selectedMessage)?.email})
                      </p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-gray-800 whitespace-pre-line">
                    {messages.find(m => m.id === selectedMessage)?.message}
                  </p>
                </div>

                <div className="flex-1 p-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-primary-200 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary-600" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500">
                          <textarea
                            rows={3}
                            name="reply"
                            id="reply"
                            className="block w-full py-3 px-4 border-0 resize-none focus:ring-0 sm:text-sm"
                
                            placeholder="Write your reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                          />
                          <div className="py-2 px-3 bg-gray-50 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <button type="button" className="text-gray-400 hover:text-gray-600">
                                <Paperclip className="h-5 w-5" />
                              </button>
                            </div>
                            <button
                              type="submit"
                              onClick={handleSendReply}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Send Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Mail className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Select a message</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Choose a message from the list to view its contents
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminMessagesPage;