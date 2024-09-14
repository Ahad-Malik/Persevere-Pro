import React from 'react';
import { ChevronLeft, ChevronRight, Edit } from 'lucide-react';
import Header from '@/components/layout/Header';
import Link from 'next/link';

const UserProfilePage = () => {
  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <Header />
      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <div className="w-48 bg-[#121212] p-4 flex flex-col">
          <ul className="space-y-2 flex-grow">
            <li className="py-1 px-2 hover:bg-[#2A2A2A] rounded">
              <Link href="/" className="block">
                Home
              </Link>
            </li>
            <li className="py-1 px-2 bg-[#2A2A2A] rounded">
              <Link href="/profile" className="block">
                Profile
              </Link>
            </li>
            <li className="py-1 px-2 hover:bg-[#2A2A2A] rounded">
              <Link href="/settings" className="block">
                Settings
              </Link>
            </li>
            <li className="py-1 px-2 hover:bg-[#2A2A2A] rounded">
              <Link href="/about" className="block">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col p-6 bg-black">
          <div className="bg-[#121212] rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Profile</h2>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <img
                  src="images/me.jpeg"
                  alt="Profile"
                  className="w-20 h-20 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold">Ahad Malik</h3>
                  <p className="text-sm text-gray-400">Joined: 6 June 2023</p>
                </div>
              </div>
              <button className="text-[#39FF14]">
                <Edit className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#1E1E1E] p-3 rounded">
                <span className="text-[#39FF14] text-sm">Name</span>
                <p className="text-white">Ahad Malik</p>
              </div>
              <div className="bg-[#1E1E1E] p-3 rounded">
                <span className="text-[#39FF14] text-sm">
                  Ranking previous month
                </span>
                <p className="text-white">#4</p>
              </div>
              <div className="bg-[#1E1E1E] p-3 rounded">
                <span className="text-[#39FF14] text-sm">Current Ranking</span>
                <p className="text-white">#1</p>
              </div>
              <div className="bg-[#1E1E1E] p-3 rounded">
                <span className="text-[#39FF14] text-sm">
                  Total Valors collected
                </span>
                <p className="text-white">2500</p>
              </div>
            </div>

            <div>
              <h4 className="text-[#39FF14] text-sm mb-2">Note:</h4>
              <textarea
                className="w-full bg-[#1E1E1E] text-white p-3 rounded"
                rows="4"
                placeholder="Write something about you..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
