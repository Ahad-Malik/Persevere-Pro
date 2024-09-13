'use client';

import React, { useState } from 'react';
import { PlusCircle, Users } from 'lucide-react';
import Header from '@/components/layout/Header';

const TeamsPage = () => {
  const [teams, setTeams] = useState([
    { id: 1, name: 'Dynamicity', members: 4 },
    { id: 2, name: 'Omega Footballers', members: 12 },
  ]);

  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);

  const handleCreateTeam = () => {
    setShowCreateTeamModal(true);
  };

  return (
    <div className="bg-black text-white min-h-screen">
        <Header />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Teams</h1>
          <button 
            onClick={handleCreateTeam} 
            className="bg-[#39FF14] text-black px-4 py-2 rounded flex items-center hover:bg-[#32D811] transition-colors"
          >
            <PlusCircle className="mr-2" size={20} />
            Create New Team
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team) => (
            <div key={team.id} className="bg-[#1E1E1E] p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-2">{team.name}</h2>
              <div className="flex items-center text-gray-400">
                <Users className="mr-2" size={20} />
                <span>{team.members} members</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCreateTeamModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#1E1E1E] p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Create New Team</h2>
            <input 
              type="text" 
              placeholder="Team Name" 
              className="w-full p-2 mb-4 bg-[#2A2A2A] text-white rounded"
            />
            <div className="flex justify-end">
              <button 
                onClick={() => setShowCreateTeamModal(false)} 
                className="mr-2 px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-[#39FF14] text-black rounded hover:bg-[#32D811] transition-colors"
              >
                Create Team
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsPage;