import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { SignupContext } from '../context/SignupContext';
import supabase from '../supabase/supabase';

function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [error, setError] = useState('');
  const { checkboxState, setCheckboxState } = useContext(SignupContext);

  const handleSingIn = () => {
    navigate('/logIn');
  };

  const strongPwd = (str) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(str);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('유효한 이메일을 입력하세요');
      return;
    }

    if (!strongPwd(password)) {
      setError('비밀번호는 최소 8자 이상이어야 하며, 영문자, 숫자 및 특수문자를 포함해야 합니다.');
      return;
    }

    if (password !== confirmPwd) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!checkboxState) {
      setError('이용 약관에 동의해주세요');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName
        }
      }
    });

    if (error) {
      setError(error.message);
    } else {
      const user = data.user;

      const { data: insertData, error: insertError } = await supabase.from('users').insert([
        {
          id: user.id,
          email: user.email,
          pwd: password,
          firstName: firstName,
          lastName: lastName
        }
      ]);

      if (insertError) {
        setError(insertError.message);
      } else {
        Swal.fire({
          icon: 'success',
          title: '회원가입 완료',
          showConfirmButton: 'true'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/logIn');
          }
        });
      }
    }
  };

  // console.log(checkboxState);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-500 to-yellow-300">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create account</h2>
        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <a href="#" className="text-indigo-500" onClick={handleSingIn}>
            Sign in
          </a>
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSignUp}>
          <input
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex space-x-4">
            <input
              className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <input
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="password"
            placeholder="Repeat password"
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
          >
            Sign up
          </button>
          <div className="flex items-center mt-4">
            <input type="checkbox" id="terms" className="mr-2" checked={checkboxState} onChange={() => {}} disabled />
            <label htmlFor="terms" className="text-gray-600">
              I have read and agree to the{' '}
              <Link to="/service" target="_blank" className="text-indigo-500" onClick={() => setCheckboxState(true)}>
                Terms of Service
              </Link>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
