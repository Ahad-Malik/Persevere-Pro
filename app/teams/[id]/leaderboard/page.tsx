'use client';

import React, { useEffect, useState } from 'react';
import { ChevronLeft, Star, Settings } from 'lucide-react';
import Link from 'next/link';
import {
  fetchTeamMembersBasedOnPoints,
  Member,
} from '../../../lib/supabase/members';
import { useParams } from 'next/navigation';

const ScoreboardPage = () => {
  const [members, setMembers] = useState<Member[]>([]);

  const { id: teamId } = useParams();

  useEffect(() => {
    fetchTeamMembersBasedOnPoints({ team_id: teamId as string }).then(
      (fetchedMembers) => {
        setMembers(fetchedMembers as Member[]);
      }
    );
  }, []);

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <header className="bg-[#121212] p-4 flex justify-between items-center border-b border-[#39FF14]">
        <Link href={`/teams/${teamId}`}>
          <ChevronLeft className="h-6 w-6 hover:text-[#39FF14]" />
        </Link>
        <h1 className="text-xl font-bold">PERSEVERE PRO</h1>
        <Link href="/settings">
          {' '}
          <Settings className="h-6 w-6 hover:text-[#39FF14]" />{' '}
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center p-4">
        {/* Scoreboard Title */}
        <div className="flex justify-center items-center mb-4">
          <Star className="h-6 w-6 text-[#39FF14] mr-2" />
          <h2 className="text-2xl font-bold">Scoreboard</h2>
        </div>

        {/* Scoreboard and Top 3 Container */}
        <div className="w-full max-w-5xl flex justify-center">
          {/* Scoreboard */}
          <div className="flex-1 max-w-3xl bg-[#1E1E1E] rounded-lg p-4 mr-4">
            <div className="grid grid-cols-3 gap-2 mb-2 text-xs font-bold">
              <div className="bg-[#2A2A2A] p-2 rounded text-center">
                CLAN MEMBERS
              </div>
              <div className="bg-[#2A2A2A] p-2 rounded text-center">POINTS</div>
              <div className="bg-[#2A2A2A] p-2 rounded text-center">
                RANKING
              </div>
            </div>
            {members.map((member, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                <div className="bg-[#39FF14] text-black p-2 rounded text-sm">
                  {member.user.name}
                </div>
                <div className="bg-[#39FF14] text-black p-2 rounded text-center text-sm">
                  {member.points}
                </div>
                <div className="bg-[#39FF14] text-black p-2 rounded text-center font-bold text-sm">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Top 3 Rankings */}
          <div className="w-64 bg-[#121212] p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-3">Top 3</h3>
            {members.slice(0, 3).map((member, index) => (
              <div key={index} className="mb-3 bg-[#2A2A2A] p-3 rounded-lg">
                <h4 className="text-sm font-semibold mb-1 bg-[#39FF14] text-black px-2 py-1 rounded">
                  #{index + 1}
                </h4>
                <p className="text-sm truncate">{member.user.name}</p>
                <p className="text-sm font-bold">{member.points} pts</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScoreboardPage;
