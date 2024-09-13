import { supabase } from '..';

export interface Task {
  name: string;
}

export const fetchAllTasksByTeamId = async ({
  team_id,
}: {
  team_id: string;
}) => {
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('team_id', team_id);

  return tasks;
};

export const createTaskByTeamId = async ({
  name,
  points,
  team_id,
}: {
  name: string;
  points: number;
  team_id: string;
}) => {
  const {} = await supabase.from('tasks').insert({ name, points, team_id });
};
