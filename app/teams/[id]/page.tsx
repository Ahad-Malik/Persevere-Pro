'use client';

import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Users,
  MessageSquare,
  Settings,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import { fetchAllTasksByTeamId, Task } from '../../lib/supabase/tasks';
import { fetchMembersByTeamId, Member } from '../../lib/supabase/members';

const PolaroidImage = ({ src, alt, onClick }) => (
  <div
    className="absolute bottom-1 right-1 w-12 h-14 bg-white p-1 shadow-md cursor-pointer transform transition-transform hover:scale-105"
    onClick={onClick}
  >
    <img src={src} alt={alt} className="w-full h-10 object-cover" />
    <div className="h-4 bg-white"></div>
  </div>
);

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 8, 1)); // Sept 2023
  const router = useRouter();
  const { id: teamId } = useParams();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    fetchMembersByTeamId({ team_id: teamId as string }).then(
      (fetchedMembers) => {
        setMembers(fetchedMembers as Member[]);
      }
    );

    fetchAllTasksByTeamId({ team_id: teamId as string }).then(
      (fetchedTasks) => {
        setTasks(fetchedTasks as Task[]);
      }
    );
  }, []);

  const changeMonth = (direction: string) => {
    setCurrentDate(
      new Date(
        currentDate.setMonth(
          currentDate.getMonth() + (direction === 'prev' ? -1 : 1)
        )
      )
    );
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth };
  };

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentDate);

  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1) + 1;
    return dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null;
  });

  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const polaroidDates = {
    1: '/images/ok.jpg',
  };

  const handleImageClick = (day: string) => {
    router.push(`/teams/${teamId}/gallery`);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-48 bg-[#121212] p-4 flex flex-col overflow-y-auto">
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <Users className="mr-2 h-5 w-5 text-center" /> Members
          </h2>
          <ul className="space-y-2 flex-grow">
            {members.map((member) => (
              <li
                key={member.id}
                className="py-1 px-2 hover:bg-[#2A2A2A] rounded text-sm"
              >
                {member.user.name}
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4">
            <Link href="/profile">
              <User className="h-5 w-5 hover:text-[#39FF14]" />
            </Link>
            <MessageSquare className="h-5 w-5" />
            <Link href="/settings">
              <Settings className="h-5 w-5 hover:text-[#39FF14]" />
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col p-6 bg-black overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => changeMonth('prev')}
              className="text-[#39FF14]"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <h2 className="text-4xl font-bold text-white">
              {currentDate.toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </h2>
            <button
              onClick={() => changeMonth('next')}
              className="text-[#39FF14]"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 bg-[#1E1E1E] p-1 rounded-lg">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center font-bold py-2 bg-[#39FF14] text-black text-xs"
              >
                {day}
              </div>
            ))}
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className="h-20 bg-[#1E1E1E] p-2 relative border border-[#2A2A2A]"
              >
                {day && (
                  <>
                    <span className="text-sm">{day}</span>
                    {polaroidDates[day] && (
                      <PolaroidImage
                        src={polaroidDates[day]}
                        alt={`Day ${day}`}
                        onClick={() => handleImageClick(day)}
                      />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-48 bg-[#121212] p-4 flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Tasks</h2>
            <Link
              href={`${teamId}/tasks`}
              className="text-[#39FF14] hover:bg-[#39FF14] hover:text-black px-3 py-2 rounded font-bold text-sm"
            >
              View All
            </Link>
          </div>
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2 bg-[#39FF14] text-black px-2 py-1 rounded">
              Clan Tasks
            </h3>
            <ul className="space-y-2">
              {tasks.map((task, index) => (
                <li key={index} className="flex items-center text-xs">
                  <CheckSquare className="mr-1 h-3 w-3 text-[#39FF14]" />
                  <span>{task.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto">
            <Link
              href={`/teams/${teamId}/leaderboard`}
              className="bg-[#39FF14] text-black px-3 py-2 rounded font-bold block text-center text-sm"
            >
              Scoreboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
