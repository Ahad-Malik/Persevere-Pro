'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Task,
  createTaskByTeamId,
  fetchAllTasksByTeamId,
} from '../../../lib/supabase/tasks';
import {
  ChevronLeft,
  Calendar,
  ListTodo,
  Plus,
  Clock,
  Users,
  Settings,
  MessageSquare,
  User,
  X,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import {
  fetchTeamMembersBasedOnPoints,
  Member,
} from '../../../lib/supabase/members';
import { useParams } from 'next/navigation';

const TasksPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskPoints, setNewTasksPoints] = useState(0);

  const { id: teamId } = useParams();

  useEffect(() => {
    fetchTeamMembersBasedOnPoints({ team_id: teamId as string }).then(
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

  const handleAddTask = async () => {
    if (newTaskName.trim() === '') return;

    await createTaskByTeamId({
      name: newTaskName,
      points: newTaskPoints,
      team_id: teamId as string,
    });
    setNewTaskName('');
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <Header />
      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <div className="w-48 bg-[#121212] p-4 flex flex-col">
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <Users className="mr-2 h-5 w-5" /> Members
          </h2>
          <ul className="space-y-2 flex-grow">
            {members.map((member, index) => (
              <li
                key={index}
                className="py-1 px-2 hover:bg-[#2A2A2A] rounded text-sm"
              >
                {member.user.name}
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4">
            <Link href="/profile">
              {' '}
              <User className="h-5 w-5 hover:text-[#39FF14]" />{' '}
            </Link>
            <MessageSquare className="h-5 w-5" />
            <Link href="/settings">
              {' '}
              <Settings className="h-5 w-5 hover:text-[#39FF14]" />{' '}
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col p-6 bg-black">
          <div className="flex justify-between items-center mb-6">
            <Link href={`/teams/${teamId}`} className="text-[#39FF14]">
              <ChevronLeft className="h-6 w-6" />
            </Link>
            <div className="bg-[#39FF14] text-black px-4 py-2 rounded-full font-bold">
              <Link href="/leaderboard">Scoreboard #4</Link>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-2">Good Morning,</h1>
          <h2 className="text-3xl font-bold mb-6">Ahad.</h2>

          <div className="bg-[#39FF14] rounded-lg p-4 mb-6 text-black relative">
            <h3 className="text-xl font-bold">Cardio and HIIT Workout</h3>
            <div className="absolute bottom-4 right-4 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
            </div>
          </div>

          <div className="flex justify-between mb-6">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-[#39FF14]" />
              <span>4 Aug</span>
            </div>
            <div className="flex items-center">
              <ListTodo className="h-5 w-5 mr-2 text-[#39FF14]" />
              <span>{tasks.length} tasks left</span>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4">Upcoming</h3>
          <div className="grid grid-cols-4 gap-4">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="bg-[#39FF14] p-4 rounded-lg text-black relative"
              >
                <h4 className="text-lg font-bold">{task.name}</h4>
              </div>
            ))}
            <div
              className="bg-[#39FF14] p-4 rounded-lg text-black flex items-center justify-center cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="h-6 w-6 mr-2" />
              <span className="font-bold">New Task</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#121212] p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add New Task</h3>
              <X
                className="cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
            <input
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              placeholder="Enter task name"
              className="w-full p-2 mb-4 bg-[#2A2A2A] text-white rounded"
            />
            <input
              type="number"
              value={newTaskPoints}
              onChange={(e) => setNewTasksPoints(+e.target.value)}
              placeholder="Enter task points"
              className="w-full p-2 mb-4 bg-[#2A2A2A] text-white rounded"
            />
            <button
              onClick={handleAddTask}
              className="w-full bg-[#39FF14] text-black p-2 rounded font-bold"
            >
              Add Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
