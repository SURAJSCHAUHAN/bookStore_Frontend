import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";

const Books = () => {
  const [user, setUser] = useState();
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    title: "",
    author: "",
    year: "",
  });

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setShowUpdateForm(true);
  };

  const fetchBooks = async () => {
    try {
      const res = await fetch(
        "https://book-store-backend-suraj.vercel.app/api/books/get",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Unauthorized or something went wrong");

      const book = await res.json();
      setBooks(book.data);
      setUser(book.userInfo.role);
      console.log(book);
    } catch (err) {
      console.error("Failed to fetch Books", err);
    }
  };

  const updateBook = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/books/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.msg || "Update failed");

      console.log("Updated:", data);
      window.location.reload(); // 🔄 refresh after update
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const deleteBook = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/books/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.msg || "Delete failed");

      console.log("Deleted:", data);
      window.location.reload(); // 🔄 refresh to update UI
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (selectedBook) {
      setUpdatedData({
        title: selectedBook.title,
        author: selectedBook.author,
        year: selectedBook.year,
      });
    }
  }, [selectedBook]);

  return (
    <div className="overflow-x-auto rounded-lg shadow-md mt-10">
      <table className="min-w-full divide-y divide-gray-400 bg-gray-300">
        <thead className="bg-gray-300 font-bold">
          <tr>
            <th className="px-6 py-3 text-left text-sm  text-gray-700">
              Title
            </th>
            <th className="px-6 py-3 text-left text-sm  text-gray-700">
              Author
            </th>
            <th className="px-6 py-3 text-left text-sm  text-gray-700">Year</th>
            <th className="px-6 py-3 text-center text-sm  text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {books?.map((book) => (
            <tr key={book._id} className="hover:bg-gray-50 font-semibold">
              <td className="px-6 py-4 text-sm text-gray-800">{book.title}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{book.author}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{book.year}</td>
              <td className="px-6 py-4 text-center ">
                {user === "admin" ? (
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => handleEditClick(book)}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      title="Edit"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteBook(book._id)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => deleteBook(book._id)}
                      className="text-blue-800 hover:text-blue-500 cursor-pointer"
                      title="View"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
          {books?.length === 0 && (
            <tr>
              <td
                colSpan="4"
                className="text-center text-sm text-gray-500 py-6"
              >
                No books found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showUpdateForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Book</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateBook(selectedBook._id);
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Title"
                className="w-full p-2 border rounded"
                value={updatedData.title}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, title: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Author"
                className="w-full p-2 border rounded"
                value={updatedData.author}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, author: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Year"
                className="w-full p-2 border rounded"
                value={updatedData.year}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, year: e.target.value })
                }
                required
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowUpdateForm(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;
