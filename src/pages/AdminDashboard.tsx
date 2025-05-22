import { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const AdminDashboard = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [tourDesc, setTourDesc] = useState("");
  const [tours, setTours] = useState<{ video: string; description: string }[]>([]);
  const [message, setMessage] = useState(""); // ✅ Success message state

  useEffect(() => {
    const stored = localStorage.getItem("tours");
    if (stored) {
      setTours(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = () => {
    // ✅ Optional URL validation
    if (!videoUrl || !tourDesc) {
      setMessage("Both fields are required.");
      return;
    }

    // (Optional) validate embed URL pattern
    if (!videoUrl.startsWith("https://www.youtube.com/embed/")) {
      setMessage("Please enter a valid YouTube embed URL (must start with https://www.youtube.com/embed/).");
      return;
    }

    const newTour = { video: videoUrl, description: tourDesc };
    const updatedTours = [...tours, newTour];

    setTours(updatedTours);
    localStorage.setItem("tours", JSON.stringify(updatedTours));

    setVideoUrl("");
    setTourDesc("");
    setMessage("✅ Tour added successfully!"); // ✅ Show message
  };

  const handleClearTours = () => {
    localStorage.removeItem("tours");
    setTours([]);
    setMessage("🗑️ All tours cleared.");
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* FORM */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Video URL (YouTube embed)"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
          <textarea
            placeholder="Tour description"
            value={tourDesc}
            onChange={(e) => setTourDesc(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Add Tour
          </button>

          {/* ✅ Show Success/Error Message */}
          {message && <p className="text-sm text-green-700">{message}</p>}
        </div>

        {/* ✅ Optional: Clear All Tours Button */}
        {tours.length > 0 && (
          <button
            onClick={handleClearTours}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Clear All Tours
          </button>
        )}

        {/* TOUR LIST */}
        <h2 className="text-xl font-semibold mt-12 mb-4">Added Tours:</h2>
        <ul className="space-y-4">
          {tours.map((tour, idx) => (
            <li key={idx} className="border p-4 rounded shadow">
              <iframe
                src={tour.video}
                className="w-full h-64 mb-2"
                title={`tour-video-${idx}`}
                allowFullScreen
              />
              <p>{tour.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
