import { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const ToursPage = () => {
  const [tours, setTours] = useState<{ video: string; description: string }[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("tours");
    if (stored) {
      setTours(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-8 text-center">Tour Packages</h1>

        {tours.length === 0 ? (
          <p className="text-center text-gray-500">No tours added yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {tours.map((tour, idx) => (
              <div
                key={idx}
                className="border rounded-lg shadow-md overflow-hidden"
              >
                <iframe
                  src={tour.video}
                  className="w-full h-64"
                  title={`tour-video-${idx}`}
                  allowFullScreen
                />
                <div className="p-4">
                  <p className="text-gray-700">{tour.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ToursPage;
