import React, { useState, useEffect, useRef } from "react";
import { getQuotes } from "../services/api";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaBars } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const QuoteListPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await getQuotes(5, offset, token);
        if (response.data.length === 0) {
          setHasMore(false);
          return;
        }
        setQuotes((prev) => [...prev, ...response.data.data]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuotes();
  }, [offset]);

  useEffect(() => {
    const loader = loaderRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prev) => prev + 5);
        }
      },
      { threshold: 1.0 }
    );

    if (loader) {
      observer.observe(loader);
    }

    return () => {
      if (loader) {
        observer.unobserve(loader);
      }
    };
  }, [loaderRef, hasMore]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("User Loggedout");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b bg-gray-100 py-4 px-6 shadow-md relative flex items-center justify-center sm:justify-between w-full lg:w-5/6 m-auto mt-4 rounded-full">
        <div className="flex-1 flex justify-center">
          <h2 className="text-3xl font-extrabold tracking-wide">Quotes</h2>
        </div>
        <button
          className="absolute right-6 bg-black hover:font-bold text-white px-5 py-2 rounded-lg hidden sm:block"
          onClick={handleLogout}
        >
          Logout
        </button>

        <button className="absolute right-6 sm:hidden" onClick={() => setShowMenu(!showMenu)}>
          <FaBars className="text-2xl" />
        </button>
      </div>

      {showMenu && (
        <div className="sm:hidden flex flex-col bg-gray-100 px-6 py-4">
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg">
            Logout
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
        {quotes.map((quote, index) => (
          <div
            key={index}
            className="border bg-white border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2"
          >
            <div className="relative overflow-hidden rounded-lg">
              {quote.mediaUrl ? (
                <img src={quote.mediaUrl} alt="Quote" className="w-full h-56 object-cover" />
              ) : (
                <div className="w-full h-56 bg-gray-50 flex items-center justify-center">
                  <p className="text-black text-center font-semibold text-lg px-4 leading-relaxed">{quote.text}</p>
                </div>
              )}
              {quote.mediaUrl && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold text-center px-4 leading-relaxed">{quote.text}</p>
                </div>
              )}
            </div>
            <div className="mt-6">
              <p className="text-xl font-semibold">{quote.username.charAt(0).toUpperCase() + quote.username.slice(1)}</p>
              <p className="text-sm text-gray-500 mt-2">{new Date(quote.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div ref={loaderRef} className="h-16 flex items-center justify-center text-gray-600 bg-gray-50 border-t mt-6 rounded-lg shadow-sm">
          Loading more...
        </div>
      )}

      <button
        onClick={() => navigate("/create-quote")}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-indigo-400 to-indigo-600 text-white p-4 shadow-xl w-16 h-16 hover:bg-indigo-700 rounded-full flex items-center justify-center transition-transform transform hover:scale-110"
      >
        <FaPlus className="text-3xl" />
      </button>
      <ToastContainer />
    </div>
  );
};

export default QuoteListPage;
