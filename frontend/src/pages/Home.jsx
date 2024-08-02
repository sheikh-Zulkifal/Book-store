import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://book-store-edpt.vercel.app/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 justify-between items-center">
      <div className="flex justify-center items-center gap-x-4 ">
        <button
          className="px-4 bg-sky-300 hover:bg-sky-600 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="px-4 bg-sky-300 hover:bg-sky-600 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
}

export default Home;