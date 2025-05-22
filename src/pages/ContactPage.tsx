// src/pages/ContactPage.tsx
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const ContactPage = () => {
  return (
    <div className="bg-white text-gray-900">
      <Navbar />
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-lg text-center mb-12">
          Have questions or need help planning your trip? Reach out to our expert team.
        </p>
        <form className="grid grid-cols-1 gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default ContactPage;
