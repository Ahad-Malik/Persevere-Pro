import { supabase } from '..';

export interface Member {
  id: string;
  name: string;
  points: number;
  user: {
    name: string;
  };
}

export const fetchMembersByTeamId = async ({
  team_id,
}: {
  team_id: string;
}) => {
  const { data: members, error } = await supabase
    .from('members')
    .select('*, user:user_id (name)')
    .eq('team_id', team_id);

  console.log('members', members);

  return members;
};

export const fetchTeamMembersBasedOnPoints = async ({
  team_id,
}: {
  team_id: string;
}) => {
  const { data: members, error } = await supabase
    .from('members')
    .select('*, user:user_id (name)')
    .eq('team_id', team_id)
    .order('points', { ascending: false });

  console.log('members', members);

  return members;
};
