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
      toast.success("Login Successful");
      localStorage.setItem("token", response.data.token);
      setTimeout(() => {
        navigate("/quotes");
      }, 1000);
    } catch (error) {
      toast.error("Something Went Wrong !!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl m-4 rounded-xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 m-3 rounded-xl">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-8 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
                  />
                  <label
                    htmlFor="username"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Username
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    placeholder="OTP (1234)"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
                  />
                  <label
                    htmlFor="otp"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    OTP (1234)
                  </label>
                </div>
                <div className="relative">
                  <button onClick={handleSubmit} className="w-full bg-cyan-500 text-white rounded-md px-4 py-2 hover:bg-cyan-600">
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
