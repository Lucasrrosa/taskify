import CreateTaskButton from '@/modules/tasks/components/CreateTaskButton'
import TaskList from '@/modules/tasks/components/TaskList'
import UpdateTaskFormModal from '@/modules/tasks/components/UpdateTaskFormModal'
import type { ITaskResponseDto } from '@/modules/tasks/dtos/ITaskResponse.dto'
import { TasksRequests } from '@/modules/tasks/requests/TasksRequests'
import { Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function TasksPage() {

  const [editTask, setEditTask] = useState<ITaskResponseDto | null>(null)
  const { data, isLoading } = useQuery({
    queryFn: async () => await TasksRequests.getTaskList({}),
    queryKey: [TasksRequests.TASK_REQUEST_KEY],
  })
  return (
    <>
      <Stack direction={'column'} className='w-full h-full flex flex-col items-center'>
        {isLoading ?
          <div>Is loading</div> :
          <TaskList tasks={data!} onEdit={setEditTask} />}
      </Stack>
      <CreateTaskButton />
      <UpdateTaskFormModal task={editTask} onClose={() => {setEditTask(null)}} />
    </>
  )
}