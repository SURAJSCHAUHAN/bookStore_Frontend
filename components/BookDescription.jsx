import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const BookDescription = () => {
  const [book, setBook] = useState({
    _id: "688db7e956b9db8045543e81",
    title: "The God of Small Things",
    author: "Arundhati Roy",
    year: 1997,
    photo:
      "https://m.media-amazon.com/images/I/91saO95VziL._UF1000,1000_QL80_.jpg",
    createdAt: "2025-08-02T07:00:22.777Z",
    __v: 0,
    description:
      "A Booker Prize-winning novel exploring family, caste, and forbidden love in Kerala.",
  });
  const { id } = useParams();

  const fetchBookDetails = async () => {
    try {
      const res = await fetch(
        `https://book-store-backend-suraj.vercel.app/api/books/get/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Unauthorized or something went wrong");

      const bookDes = await res.json();
      setBook(bookDes.data);
      console.log(bookDes.data);
    } catch (err) {
      console.error("Failed to fetch Books", err);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  return (
    <div className="h-[100vh] w-[100vw] justify-center items-center bg-gray-300 p-10">
      {book ? (
        <div className=" flex h-[90vh] w-[100%]  gap-10">
          <div>
            <img
              src={book.photo}
              alt="book_img"
              className="h-[100%] w-[100%] z-10 rounded-xl"
            />
          </div>
          <div className="w-[70%] text-2xl font-mono">
            <h1>
              Title: <span className="font-bold">{book.title}</span>
            </h1>
            <p>
              Author: <span className="font-bold">{book.author}</span>
            </p>
            <p>
              Year: <span className="font-bold">{book.year}</span>
            </p>
            <p>
              Description: <span className="font-bold">{book.description}</span>
            </p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
