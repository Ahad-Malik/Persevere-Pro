import React from 'react';
import Header from '@/components/layout/Header';
import Link from 'next/link';

const SettingsPage = () => {
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
            <li className="py-1 px-2 hover:bg-[#2A2A2A] rounded">
              <Link href="/profile" className="block">
                Profile
              </Link>
            </li>
            <li className="py-1 px-2 bg-[#2A2A2A] rounded">
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
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

            <div className="grid grid-cols-3 gap-6">
              {/* Left column */}
              <div className="col-span-1">
                <img
                  src="/images/me.jpeg"
                  alt="Profile"
                  className="w-32 h-32 rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold mb-4">Ahad Malik</h3>
                <ul className="space-y-2">
                  <li className="py-2 px-3 bg-[#2A2A2A] rounded">Account</li>
                  <li className="py-2 px-3 hover:bg-[#2A2A2A] rounded">
                    Password
                  </li>
                  <li className="py-2 px-3 hover:bg-[#2A2A2A] rounded">
                    Security & Privacy
                  </li>
                  <li className="py-2 px-3 hover:bg-[#2A2A2A] rounded">
                    Application
                  </li>
                  <li className="py-2 px-3 hover:bg-[#2A2A2A] rounded">
                    Notification
                  </li>
                </ul>
              </div>

              {/* Right column */}
              <div className="col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      First name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#2A2A2A] rounded p-2"
                      defaultValue="Ahad"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Last name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#2A2A2A] rounded p-2"
                      defaultValue="Malik"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full bg-[#2A2A2A] rounded p-2"
                      defaultValue="abc-xyz@gmail.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full bg-[#2A2A2A] rounded p-2"
                      defaultValue="+91 6655777888"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <textarea
                    className="w-full bg-[#2A2A2A] rounded p-2"
                    rows={4}
                    defaultValue="Lorem ipsum"
                  ></textarea>
                </div>
                <div className="mt-6 flex justify-start space-x-4">
                  <button className="bg-[#39FF14] text-black font-semibold py-2 px-4 rounded">
                    Update
                  </button>
                  <button className="bg-[#2A2A2A] text-white font-semibold py-2 px-4 rounded">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
