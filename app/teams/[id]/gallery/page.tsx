"use client";

import React from 'react';
import { Home, Filter } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';

const GalleryPage = ({ params }) => {
  const { year, month, day } = params;

  // In a real application, you'd fetch these images based on the date
  const images = [
    { src: '/api/placeholder/200/200', alt: 'Gym', user: 'Haseeb' },
    { src: '/api/placeholder/200/200', alt: 'Weights', user: 'Shakeeb' },
    { src: '/api/placeholder/200/200', alt: 'Study' },
    { src: '/api/placeholder/200/200', alt: 'Book' },
    { src: '/api/placeholder/200/200', alt: 'Pool' },
    { src: '/api/placeholder/200/200', alt: 'Weights' },
    { src: '/api/placeholder/200/200', alt: 'Running' },
    { src: '/api/placeholder/200/200', alt: 'Meal prep' },
    { src: '/api/placeholder/200/200', alt: 'Coffee' },
    { src: '/api/placeholder/200/200', alt: 'Study' },
    { src: '/api/placeholder/200/200', alt: 'Weights' },
    { src: '/api/placeholder/200/200', alt: 'Reading' },
    { src: '/api/placeholder/200/200', alt: 'Gym' },
  ];

  const formatDate = (year, month, day) => {
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <Header />
      <nav className="bg-[#121212] p-4 flex justify-between items-center">
        <Link href="/" className="text-[#39FF14]">
          <Home className="h-6 w-6" />
        </Link>
        <h2 className="text-xl font-semibold">{formatDate(year, month, day)}</h2>
        <div className="flex items-center">
          <span className="mr-2">Filter</span>
          <Filter className="h-6 w-6" />
        </div>
      </nav>
      <main className="flex-1 overflow-hidden p-4">
        <div className="h-full overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((image, index) => (
              <div key={index} className="aspect-square bg-[#1E1E1E] rounded-lg shadow-lg overflow-hidden">
                <div className="h-4/5 bg-gray-200">
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                </div>
                <div className="h-1/5 p-2">
                  {image.user && <p className="font-semibold text-xs">{image.user}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <style jsx global>{`
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;