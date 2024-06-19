import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabase';

function LoginPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const [rememberMe, setRememberMe] = useState(false);

  const handleSingup = () => {
    navigate('/signUp');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword(userData);
      if (error) console.error(error);
      if (data) {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  console.log(userData);
  return (
    <div className="flex min-h-screen">
      {/* Left side with gradient background */}
      <div className="flex items-center justify-center w-1/2 bg-gradient-to-r from-purple-500 to-orange-300">
        <div className="text-white text-5xl font-bold">Welcome Back!</div>
      </div>
      .{/* Right side with login form */}
      <div className="flex items-center justify-center w-1/2 bg-white">
        <form className="flex flex-col items-center gap-4 p-6 w-2/3 bg-white shadow-lg rounded" onSubmit={handleSubmit}>
          <div className="text-2xl font-semibold text-gray-800">Login</div>
          <p className="text-gray-600">Welcome back! Please login to your account.</p>
          <input
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="email"
            placeholder="E-mail"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          <div className="flex items-center justify-between w-full">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Remember Me</span>
            </label>
            <a href="#" className="text-indigo-500">
              Forgot Password?
            </a>
          </div>
          <button className="w-full py-2 mt-4 text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-700">
            Login
          </button>
          <p className="mt-4">
            New User?{' '}
            <a href="#" className="text-indigo-500 " onClick={handleSingup}>
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
