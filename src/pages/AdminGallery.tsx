import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const categories = ["Individual", "Couples", "Family", "Pets", "Celebrity"];

const AdminGallery = () => {
  const [images, setImages] = useState<any[]>([]);
  const [category, setCategory] = useState("Individual");
  const [file, setFile] = useState<File | null>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch(`${API_BASE}/api/gallery`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  const uploadImage = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", category);

    const res = await fetch(`${API_BASE}/api/admin/gallery`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const newImage = await res.json();
    setImages((prev) => [newImage, ...prev]);
    setFile(null);
  };

  const deleteImage = async (id: string) => {
    await fetch(`${API_BASE}/api/admin/gallery/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    setImages((prev) => prev.filter((img) => img._id !== id));
  };

  const filtered =
    filter === "All"
      ? images
      : images.filter((img) => img.category === filter);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Gallery Management</h1>

      {/* Upload Section */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl flex flex-wrap gap-4 items-center">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <button
          onClick={uploadImage}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md"
        >
          Upload
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-3">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-md ${
              filter === cat
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 dark:bg-zinc-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((img, index) => (
          <motion.div
            key={img._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="relative group"
          >
            <img
              src={img.imageUrl}
              alt="portrait"
              className="rounded-xl shadow-lg w-full h-60 object-cover"
            />

            <button
              onClick={() => deleteImage(img._id)}
              className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition"
            >
              Delete
            </button>
            <button
  onClick={async () => {
    const res = await fetch(
      `${API_BASE}/api/admin/gallery/${img._id}/featured`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ featured: !img.featured }),
      }
    );
    const updated = await res.json();
    setImages((prev) =>
      prev.map((i) =>
        i._id === img._id ? { ...i, featured: updated.featured } : i
      )
    );
  }}
  className={`absolute bottom-3 left-3 text-xs px-3 py-1 rounded-md ${
    img.featured
      ? "bg-green-600 text-white"
      : "bg-gray-200 text-black"
  }`}
>
  {img.featured ? "Featured" : "Make Featured"}
</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;