import React from 'react';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

const Header: React.FC = () => {
  return (
    <header className={`${outfit.className} bg-black text-white p-4 border-b border-[#39FF14]`}>
      <div className="container mx-auto flex justify-center items-center">
        <h1 className="text-2xl font-bold">PERSEVERE PRO</h1>
      </div>
    </header>
  );
};

export default Header;