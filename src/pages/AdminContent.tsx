import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_URL;

const AdminContent = () => {
  const [heroImage, setHeroImage] = useState("");
  const [aboutImage, setAboutImage] = useState("");
  const [aboutText, setAboutText] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch existing content
  useEffect(() => {
    fetch(`${API}/api/site-content`)
      .then(res => res.json())
      .then(data => {
        if (!data) return;
        setHeroImage(data.heroImage || "");
        setAboutImage(data.aboutImage || "");
        setAboutText(data.aboutText || "");
      });
  }, []);

  // Upload Image Handler
  const handleUpload = async (file: File, type: "hero" | "about") => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${API}/api/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (type === "hero") setHeroImage(data.imageUrl);
    if (type === "about") setAboutImage(data.imageUrl);
  };

  // Save Content
  const handleSave = async () => {
    setLoading(true);

    await fetch(`${API}/api/site-content`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        heroImage,
        aboutImage,
        aboutText,
      }),
    });

    setLoading(false);
    alert("Content Updated Successfully");
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold mb-8">Website Content Management</h1>

      <div className="grid gap-10 max-w-4xl">

        {/* HERO IMAGE */}
        <div className="glass p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Hero Section</h2>

          {heroImage && (
            <img
              src={heroImage}
              className="w-full h-48 object-cover rounded mb-4"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              e.target.files && handleUpload(e.target.files[0], "hero")
            }
            className="mb-4"
          />
        </div>

        {/* ABOUT IMAGE */}
        <div className="glass p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">About Section Image</h2>

          {aboutImage && (
            <img
              src={aboutImage}
              className="w-full h-48 object-cover rounded mb-4"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              e.target.files && handleUpload(e.target.files[0], "about")
            }
            className="mb-4"
          />
        </div>

        {/* ABOUT TEXT */}
        <div className="glass p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">About Text</h2>

          <textarea
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            rows={5}
            className="w-full bg-secondary p-4 rounded resize-none"
          />
        </div>

        {/* SAVE BUTTON */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={loading}
          className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-semibold py-3 rounded-lg shadow-lg"
        >
          {loading ? "Saving..." : "Save Changes"}
        </motion.button>
      </div>
    </div>
  );
};

export default AdminContent;