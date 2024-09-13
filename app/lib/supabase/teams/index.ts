import { supabase } from '..';

export interface Team {
  id: string;
  name: string;
  created_at: string;
  member_count: number;
}

export const fetchAllTeams = async () => {
  const { data: teams, error } = await supabase.from('teams').select('*');

  console.log('teams', teams);

  return teams;
};

export const createTeam = async ({ name }: { name: string }) => {
  const {} = await supabase.from('teams').insert({ name });
};
