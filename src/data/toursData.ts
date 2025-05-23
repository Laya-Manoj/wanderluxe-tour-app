import { Tour } from '../components/tours/TourCard';

// Extended tour data with additional admin properties
export interface AdminTour extends Tour {
  status: 'published' | 'draft';
  availability: 'available' | 'limited' | 'soldout';
  lastUpdated: string;
  totalBookings: number;
}

export const toursData: AdminTour[] = [
  {
    id: 1,
    title: 'Greek Islands Luxury Cruise',
    description: 'Experience the breathtaking beauty of the Greek Islands on our luxury cruise.',
    price: 2499,
    duration: '10',
    rating: 4.9,
    groupSize: 12,
    image: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg',
    location: 'Greek Islands',
    status: 'published',
    availability: 'limited',
    lastUpdated: '2025-03-10',
    totalBookings: 24,
    place: '',
    maxPeople: 0
  },
  {
    id: 2,
    title: 'Japanese Cherry Blossom Tour',
    description: 'Immerse yourself in the magic of Japan during cherry blossom season.',
    price: 3299,
    duration: '12',
    rating: 4.8,
    groupSize: 10,
    image: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg',
    location: 'Japan',
    status: 'published',
    availability: 'available',
    lastUpdated: '2025-03-05',
    totalBookings: 18,
    place: '',
    maxPeople: 0
  },
  {
    id: 3,
    title: 'Peruvian Highlands Expedition',
    description: 'Discover ancient Incan ruins and breathtaking mountain vistas in Peru.',
    price: 2899,
    duration: '14',
    rating: 4.7,
    groupSize: 8,
    image: 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg',
    location: 'Peru',
    status: 'published',
    availability: 'available',
    lastUpdated: '2025-02-28',
    totalBookings: 12,
    place: '',
    maxPeople: 0
  },
  {
    id: 4,
    title: 'African Safari Adventure',
    description: 'Experience the ultimate wildlife safari across the Serengeti and Maasai Mara.',
    price: 4150,
    duration: '10',
    rating: 4.9,
    groupSize: 6,
    image: 'https://images.pexels.com/photos/33045/lion-wild-africa-african.jpg',
    location: 'Tanzania & Kenya',
    status: 'published',
    availability: 'limited',
    lastUpdated: '2025-03-01',
    totalBookings: 9,
    place: '',
    maxPeople: 0
  },
  {
    id: 5,
    title: 'Amalfi Coast Private Tour',
    description: 'Explore the stunning Amalfi Coast with private guides and luxury accommodations.',
    price: 3750,
    duration: '8',
    rating: 4.8,
    groupSize: 4,
    image: 'https://images.pexels.com/photos/1797277/pexels-photo-1797277.jpeg',
    location: 'Italy',
    status: 'draft',
    availability: 'available',
    lastUpdated: '2025-03-12',
    totalBookings: 0,
    place: '',
    maxPeople: 0
  },
  {
    id: 6,
    title: 'Northern Lights Expedition',
    description: 'Chase the aurora borealis across Iceland with expert photography guides.',
    price: 3450,
    duration: '7',
    rating: 4.7,
    groupSize: 8,
    image: 'https://images.pexels.com/photos/1933316/pexels-photo-1933316.jpeg',
    location: 'Iceland',
    status: 'draft',
    availability: 'available',
    lastUpdated: '2025-03-08',
    totalBookings: 0,
    place: '',
    maxPeople: 0
  }
];