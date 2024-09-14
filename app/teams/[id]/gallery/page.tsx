'use client';

import React, { useEffect, useState } from 'react';
import { Home, Filter } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { fetchAllTasksOfTeam, Task } from '@/app/lib/supabase/tasks';
import { useParams } from 'next/navigation';

const GalleryPage = () => {
  const { year, month, day } = { year: '2000', month: '08', day: '01' };

  const [tasks, setTasks] = useState<Task[]>([]);

  const { id: teamId } = useParams();

  useEffect(() => {
    fetchAllTasksOfTeam({ team_id: teamId as string }).then((fetchedTasks) => {
      setTasks(fetchedTasks as Task[]);
      console.log('all the fetched tasks', fetchedTasks);
    });
  }, []);

  const formatDate = (year, month, day) => {
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <Header />
      <nav className="bg-[#121212] p-4 flex justify-between items-center">
        <Link href="/teams" className="text-[#39FF14]">
          <Home className="h-6 w-6" />
        </Link>
        <h2 className="text-xl font-semibold">
          {formatDate(year, month, day)}
        </h2>
        <div className="flex items-center">
          <span className="mr-2">Filter</span>
          <Filter className="h-6 w-6" />
        </div>
      </nav>
      <main className="flex-1 overflow-hidden p-4">
        <div className="h-full overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {tasks.map((task) =>
              task.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square bg-[#1E1E1E] rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="h-4/5 bg-gray-200">
                    <img
                      src={image.imageUrl}
                      alt={image.imageUrl}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-1/5 p-2">
                    {image.member_name && (
                      <p className="font-semibold text-xs">
                        {image.member_name}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
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
