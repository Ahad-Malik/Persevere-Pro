import { supabase } from '..';

export interface Member {
  id: string;
  name: string;
  points: number;
  user: {
    name: string;
  };
}

export const fetchAllMembers = async () => {
  const { data: members, error } = await supabase
    .from('members')
    .select('*, user:user_id (name)');

  console.log('members', members);

  return members;
};

export const fetchAllMembersBasedOnPoints = async () => {
  const { data: members, error } = await supabase
    .from('members')
    .select('*, user:user_id (name)')
    .order('points', { ascending: false });

  console.log('members', members);

  return members;
};

export const createMember = async (member: Member) => {
  const {} = await supabase
    .from('members')
    .insert({ ...member, team_id: 'a0e4e94a-8f39-4dc5-b774-846ceffe8f1b' });
};
