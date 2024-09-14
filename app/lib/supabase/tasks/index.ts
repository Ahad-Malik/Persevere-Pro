import { supabase } from '..';

export interface Task {
  id: string;
  name: string;
  description?: string;
  points: number;
  images: { image_url: string; member_id: string }[];
}

export const fetchAllTasksByTeamId = async ({
  team_id,
  member_id,
}: {
  team_id: string;
  member_id: string;
}) => {
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('team_id', team_id)
    .eq('status', 'open');

  return tasks || [];
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
  const { error } = await supabase
    .from('tasks')
    .insert({ name, points, team_id });

  if (error) console.log('error while creating task', error);
};

const uploadTaskImageToStorageBucket = async ({
  teamId,
  taskId,
  memberId,
  file,
}: {
  teamId: string;
  taskId: string;
  memberId: string;
  file: File;
}) => {
  const { data, error } = await supabase.storage
    .from('teams_bucket')
    .upload(`${teamId}/tasks_images/${taskId}/${memberId}`, file);

  if (error) console.error('supabase error uploading pic', error);

  return data?.path;
};

export const markTaskAsCompleted = async ({
  id,
  memberId,
  teamId,
  file,
}: {
  id: string;
  memberId: string;
  teamId: string;
  file: File;
}) => {
  // upload file to storage bucket
  const imagePath = await uploadTaskImageToStorageBucket({
    taskId: id,
    memberId,
    file,
    teamId,
  });

  const { data: images } = await supabase
    .from('tasks')
    .select('images, completed_by')
    .eq('id', id)
    .single();
  console.log('images', images);
  console.log('image path', imagePath);

  let imagesArr: any[] = [];
  let completedByList: any[] = images?.completed_by || [];

  console.log('the completed by list', completedByList);

  if (!!images?.images && images?.images.length > 0) {
    imagesArr = [
      ...images.images,
      {
        member_id: memberId,
        imageUrl: supabase.storage
          .from('teams_bucket')
          .getPublicUrl(imagePath!),
      },
    ];
  } else {
    imagesArr.push({
      member_id: memberId,
      imageUrl: supabase.storage.from('teams_bucket').getPublicUrl(imagePath!),
    });
  }

  completedByList.push(memberId);

  console.log('the images array to be uploaded', imagesArr);

  const { data: updatedTaskData, error: errorUpdateTaskData } = await supabase
    .from('tasks')
    .update({
      images: imagesArr,
      completed_by: completedByList,
    })
    .eq('id', id)
    .select()
    .single();

  if (errorUpdateTaskData)
    console.log('update task data error', errorUpdateTaskData);

  const { data: memberData, error: errorMemberData } = await supabase
    .from('members')
    .select('points')
    .eq('id', memberId)
    .single();

  if (errorMemberData) console.log('fetch member data error', errorMemberData);

  console.log('the member data', memberData);
  console.log('the updated task data', updatedTaskData);

  const { error: errorMemberUpdate } = await supabase
    .from('members')
    .update({ points: memberData?.points + updatedTaskData?.points })
    .eq('id', memberId);

  if (errorMemberUpdate)
    console.log('update member data error', errorMemberUpdate);
};
