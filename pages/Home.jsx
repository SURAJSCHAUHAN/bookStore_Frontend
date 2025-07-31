import React, { useState, useEffect } from "react";
import Books from "../components/Books";

const Home = () => {
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    author: "",
    year: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/check", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Not authorized");

        const data = await res.json();
        setUser(data.user);
        console.log(data);
      } catch (err) {
        console.error("Not logged in", err);
        window.location.href = "/login";
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Logout failed");

      console.log(data.msg);
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addBook = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/books/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error("Book Add failed");

      console.log(data);
      setShowModal(false); // close modal
      setForm({ title: "", author: "", year: "" }); // reset form
      window.location.reload();
    } catch (err) {
      console.error("Add book error:", err);
    }
  };

  return (
    <div className="flex h-[100vh] w-[100vw] flex-col bg-gray-300">
      <div className="flex w-[100vw] items-center justify-end pr-5 pt-3">
        <button
          onClick={logout}
          className="px-5 py-2 bg-gray-600 rounded-xl text-white"
        >
          LogOut
        </button>
      </div>

      <div className="flex flex-col w-[100%] p-10 text-4xl font-sans relative">
        <h1>
          Welcome <span className="font-bold">{user?.username}</span>,
        </h1>
        <h2>
          Your Role: <span className="font-bold">{user?.role}</span>
        </h2>

        {user.role === "admin" && (
          <button
            onClick={() => setShowModal(true)}
            className="absolute bottom-0 right-3 px-5 py-2 text-lg bg-gray-600 rounded-xl text-white  cursor-pointer"
          >
            Add Books
          </button>
        )}
      </div>

      <Books />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-300 p-6 rounded-lg w-[90%] max-w-md shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Add New Book</h3>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full mb-3 p-2 border rounded"
            />

            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Author"
              className="w-full mb-3 p-2 border rounded"
            />

            <input
              type="number"
              name="year"
              value={form.year}
              onChange={handleChange}
              placeholder="Year"
              className="w-full mb-4 p-2 border rounded"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={addBook}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
