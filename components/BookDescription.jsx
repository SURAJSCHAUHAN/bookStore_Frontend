import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const BookDescription = () => {
  const [book, setBook] = useState();
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
    <div>
      {book ? (
        <div>
          <h1>{book.title}</h1>
          <p>{book.author}</p>
          <p>{book.year}</p>
          <p>{book.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
