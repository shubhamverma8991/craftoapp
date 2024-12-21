import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("1234");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await login(username, otp);
      localStorage.setItem("token", response.data.token);
      navigate("/quotes");
      toast.success("Login Successfull");
    } catch (error) {
      //   alert("Login failed. Please try again.");
      toast.error("Something Went Wrong !!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />
        <input
          type="text"
          placeholder="OTP should be 1234"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />
        <button onClick={handleSubmit} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Login
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
