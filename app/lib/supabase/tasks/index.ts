import { supabase } from '..';

export interface Task {
  name: string;
}

export const fetchAllTasks = async () => {
  const { data: tasks, error } = await supabase.from('tasks').select('*');

  return tasks;
};

export const createTask = async (task: Task) => {
  const {} = await supabase
    .from('tasks')
    .insert({ ...task, team_id: 'a0e4e94a-8f39-4dc5-b774-846ceffe8f1b' });
};
