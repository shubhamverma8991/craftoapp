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
      //   alert("Quote created successfully!");
      toast.success("Quote created successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    const uploadResponse = await uploadImage(selectedFile);
    const url = uploadResponse.data[0].url;
    setMediaUrl(url);
    console.log(url);
  };

  const back = () => {
    navigate("/quotes");
  };

  return (
    <div>
      <div onClick={back} className="cursor-pointer">
        &nbsp; &nbsp;
        <FaArrowLeftLong className="inline-block" />
        &nbsp; Back
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md border border-indigo-300 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-center mb-6">Create Quote</h2>
          <textarea
            placeholder="Enter your quote"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 border border-indigo-300 rounded-lg mb-4"
          />
          <input type="file" onChange={handleFileChange} className="w-full p-3 border border-indigo-300 rounded-lg mb-4" />
          <button
            onClick={handleSubmit}
            disabled={!text || !mediaUrl}
            className={`w-full bg-blue-500 text-white py-2 border border-indigo-300 rounded-lg hover:bg-blue-600 ${
              !text || !mediaUrl ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Submit
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default QuoteCreationPage;
