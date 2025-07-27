import CreateTaskButton from '@/modules/tasks/components/CreateTaskButton'
import TaskList from '@/modules/tasks/components/TaskList'
import { TasksRequests } from '@/modules/tasks/requests/TasksRequests'
import { Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

export default function TasksPage() {

  const { data, isLoading } = useQuery({
    queryFn: async () => await TasksRequests.getTaskList({}),
    queryKey: [TasksRequests.TASK_REQUEST_KEY],
  })
  return (
    <>
      <Stack direction={'column'} className='w-full h-full flex flex-col items-center'>
        {isLoading ?
          <div>Is loading</div> :
          <TaskList tasks={data!}/>}
      </Stack>
      <CreateTaskButton />
    </>
  )
}