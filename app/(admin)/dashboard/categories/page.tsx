"use client";

import { useState } from "react";
import CategoryList from "../../compononents/categoryList";

export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
 
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

 

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage("Category name is required");
      return;
    }

  

    setLoading(true);
    setMessage("");

    try {
      const data = {
        name : name.trim(),
        description : description.trim(),
      };

      const response = await fetch(
        "http://localhost:5000/api/v1/categories",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to add category");
      }

      setMessage("Category added successfully!");
      setName("");
    

    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto rounded-xl border bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Add Category
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="mb-2 block font-medium">
            Category Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Premier League"
            className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Category Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter category description"
            className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Category"}
        </button>

        {message && (
          <p className="text-center text-sm">
            {message}
          </p>
        )}
      </form>

        <CategoryList />

    </div>
  );
}