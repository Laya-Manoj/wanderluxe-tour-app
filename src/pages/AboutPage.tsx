// src/pages/AboutPage.tsx
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const AboutPage = () => {
  return (
    <div className="bg-white text-gray-900">
      <Navbar />
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
        <p className="text-lg leading-7 text-center max-w-3xl mx-auto">
          Welcome to our luxury tourism platform. We specialize in crafting unforgettable travel experiences
          that combine elegance, comfort, and adventure. Our curated tours and exclusive services cater to
          discerning travelers who seek the extraordinary.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h2 className="text-xl font-semibold mb-2">Premium Destinations</h2>
            <p>Handpicked locations known for beauty, culture, and luxury.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Personalized Services</h2>
            <p>Custom itineraries, private tours, and VIP access tailored to your needs.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Expert Team</h2>
            <p>Experienced professionals ensuring seamless, first-class experiences.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;
