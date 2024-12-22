import React, { useState } from "react";
import { uploadImage, createQuote } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const QuoteCreationPage = () => {
  const [text, setText] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      await createQuote(text, mediaUrl, token);
      toast.success("Quote created successfully!");
      setTimeout(() => {
        navigate("/quotes");
      }, 500);
    } catch (error) {
      toast.error("Failed to create quote");
      console.error(error);
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const uploadResponse = await uploadImage(selectedFile);
      const url = uploadResponse.data[0].url;
      setMediaUrl(url);
      if (url) toast.info("Image uploaded, Submit the Quote");
    }
  };

  const back = () => {
    navigate("/quotes");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="absolute top-8 left-8 flex items-center space-x-2 cursor-pointer" onClick={back}>
        <FaArrowLeftLong className="text-2xl text-gray-600 hover:text-black transition-colors" />
        <span className="text-lg text-gray-700 hover:underline">Back</span>
      </div>
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl p-10">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10 leading-relaxed">Craft Your Quote</h2>

        <div className="mb-8">
          <label className="block text-lg font-medium text-gray-700 mb-3">Your Quote</label>
          <textarea
            placeholder="Write something inspiring..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-4 focus:ring-indigo-300 focus:outline-none resize-none shadow-sm"
            rows={4}
          />
        </div>
        <div className="mb-8">
          <label className="block text-lg font-medium text-gray-700 mb-3">Upload Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-2xl bg-white shadow-sm focus:ring-4 focus:ring-indigo-300 focus:outline-none cursor-pointer"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={!text || !mediaUrl}
          className={`w-full py-4 text-lg font-semibold rounded-2xl transition-all duration-300 ${
            !text || !mediaUrl
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 shadow-lg"
          }`}
        >
          Submit Quote
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default QuoteCreationPage;
