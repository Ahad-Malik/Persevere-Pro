"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Task, fetchAllTasks, createTask, completeTask } from '../lib/supabase/tasks';
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
  Upload,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import {
  fetchAllMembersBasedOnPoints,
  Member,
} from '../lib/supabase/members';

const TasksPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [members, setMembers] = useState<Member[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAllMembersBasedOnPoints().then((fetchedMembers) => {
      setMembers(fetchedMembers as Member[]);
    });

    fetchAllTasks().then((fetchedTasks) => {
      setTasks(fetchedTasks as Task[]);
    });
  }, []);

  const handleAddTask = async () => {
    if (newTaskName.trim() === '') return;

    await createTask({ name: newTaskName });
    setNewTaskName('');
    setIsModalOpen(false);
    // Refresh tasks after adding a new one
    const updatedTasks = await fetchAllTasks();
    setTasks(updatedTasks as Task[]);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
    setUploadedImage(null); // Reset uploaded image when opening a new task
  };

  const handleCompleteTask = async () => {
    if (selectedTask) {
      await completeTask(selectedTask.id);
      setIsTaskModalOpen(false);
      setUploadedImage(null);
      // Refresh tasks after completing one
      const updatedTasks = await fetchAllTasks();
      setTasks(updatedTasks as Task[]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
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
              <User className="h-5 w-5 hover:text-[#39FF14]" />
            </Link>
            <MessageSquare className="h-5 w-5" />
            <Link href="/settings">
              <Settings className="h-5 w-5 hover:text-[#39FF14]" />
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col p-6 bg-black">
          <div className="flex justify-between items-center mb-6">
            <Link href="/dashboard" className="text-[#39FF14]">
              <ChevronLeft className="h-6 w-6" />
            </Link>
            <div className="bg-[#39FF14] text-black px-4 py-2 rounded font-bold">
              <Link href="/leaderboard">Scoreboard #4</Link>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-2">Good Morning,</h1>
          <h2 className="text-3xl font-bold mb-6">Ahad.</h2>

          <div 
            className="bg-[#39FF14] rounded-lg p-4 mb-6 text-black relative cursor-pointer"
            onClick={() => handleTaskClick({ id: 'cardio-hiit', name: 'Cardio and HIIT Workout', points: 20, description: 'A high-intensity cardio and HIIT workout session.' })}
          >
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
                className="bg-[#39FF14] p-4 rounded-lg text-black relative cursor-pointer"
                onClick={() => handleTaskClick(task)}
              >
                <h4 className="text-lg font-bold">{task.name}</h4>
              </div>
            ))}
            <div
              className="bg-[#121212] p-4 rounded-lg text-white flex items-center justify-center cursor-pointer hover:bg-gray hover:text-[#39FF14] transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="h-6 w-6 mr-2 cursor-pointer" />
              <span className="font-bold">New Task</span>
            </div>
          </div>
        </div>
      </div>

      {/* New Task Modal */}
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
            <button
              onClick={handleAddTask}
              className="w-full bg-[#39FF14] text-black p-2 rounded font-bold"
            >
              Add Task
            </button>
          </div>
        </div>
      )}

      {/* Task Details Modal */}
      {isTaskModalOpen && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#121212] p-8 rounded-lg w-[500px] max-w-[90vw]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{selectedTask.name}</h3>
              <X
                className="cursor-pointer text-[#39FF14] h-6 w-6"
                onClick={() => setIsTaskModalOpen(false)}
              />
            </div>
            <p className="text-lg mb-4">Points: <span className="text-[#39FF14] font-bold">{selectedTask.points || 10}</span></p>
            <p className="mb-6 text-gray-300">{selectedTask.description || 'No description available.'}</p>
            <div className="mb-6">
              {uploadedImage ? (
                <div className="relative w-full h-48 mb-4">
                  <Image 
                    src={uploadedImage} 
                    alt="Uploaded image" 
                    layout="fill" 
                    objectFit="cover" 
                    className="rounded-lg"
                  />
                </div>
              ) : (
                <button 
                  className="w-full bg-[#2A2A2A] text-white p-3 rounded-lg font-bold mb-2 flex items-center justify-center hover:bg-[#3A3A3A] transition-colors"
                  onClick={handleUploadClick}
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Image
                </button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </div>
            <button
              onClick={handleCompleteTask}
              className="w-full bg-[#39FF14] text-black p-3 rounded-lg font-bold hover:bg-[#2FD30B] transition-colors"
            >
              Complete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;