import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabase';
import { AuthContext } from '../context/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPwd = localStorage.getItem('password');
    if (savedEmail && savedPwd) {
      setUserData({ email: savedEmail, password: savedPwd });
      setRememberMe(true);
    }
  }, []);

  const handleSignUp = () => {
    navigate('/signUp');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.email || !userData.password) {
      setError('이메일과 비밀번호를 입력해주세요');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword(userData);
      if (error) {
        setError('회원정보가 없습니다');
      } else {
        if (rememberMe) {
          localStorage.setItem('email', userData.email);
          localStorage.setItem('password', userData.password);
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }
        login(userData);
        navigate('/');
      }
    } catch (error) {
      setError('로그인 중 오류가 발생했습니다.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRemember = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex items-center justify-center w-1/2 bg-gradient-to-r from-purple-500 to-orange-300">
        <div className="text-white text-5xl font-bold">Welcome Back!</div>
      </div>
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
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="flex items-center justify-between w-full">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" checked={rememberMe} onChange={handleRemember} />
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
            <a href="#" className="text-indigo-500" onClick={handleSignUp}>
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
