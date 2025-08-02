import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const BookDescription = () => {
  const [book, setBook] = useState();

  const fetchBookDetails = async () => {
    const { id } = useParams();

    try {
      const res = await fetch(
        `https://book-store-backend-suraj.vercel.app/api/books/get/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Unauthorized or something went wrong");

      const book = await res.json();
      setBook(book.data);
      console.log(book);
    } catch (err) {
      console.error("Failed to fetch Books", err);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, []);

  return <div>BookDescription</div>;
};
