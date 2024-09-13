'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempted with:', { email, password });
    router.push('/teams');
  };

  return (
    <div className="w-96 p-8 bg-[#121212] rounded-lg shadow-lg backdrop-blur-sm bg-opacity-80">
      <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-bold">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              className="w-full p-2 pl-10 bg-[#2A2A2A] text-white rounded"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-bold">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              className="w-full p-2 pl-10 bg-[#2A2A2A] text-white rounded"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[#39FF14] text-black p-2 rounded font-bold hover:bg-[#32D811] transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;