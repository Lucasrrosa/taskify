import CreateTaskButton from '@/modules/tasks/components/CreateTaskButton'
import TaskFilter from '@/modules/tasks/components/TaskFilter'
import TaskList from '@/modules/tasks/components/TaskList'
import type { TaskStatusEnum } from '@/modules/tasks/enums/TaskEnum'
import { TaskstatusFilterEnum } from '@/modules/tasks/enums/TaskStatusFilterEnum'
import { TasksRequests } from '@/modules/tasks/requests/TasksRequests'
import { Paper, Skeleton, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function TasksPage() {
  const [filter, setFilter] = useState<TaskstatusFilterEnum>(TaskstatusFilterEnum.ALL)
  const statusFilter = filter === TaskstatusFilterEnum.ALL ? undefined : filter.toLowerCase() as TaskStatusEnum
  const { data, isLoading } = useQuery({
    queryFn: async () => await TasksRequests.getTaskList({
      status: statusFilter,
    }),
    queryKey: [TasksRequests.TASK_REQUEST_KEY, statusFilter],
  })
  return (
    <>
      <Stack direction={'column'} className='w-full h-full flex flex-col items-center mt-2'>
        <Typography variant='h5'>Taskify</Typography>
        <TaskFilter
          filter={filter}
          onFilterChange={setFilter}
        />
        {isLoading ?
          <Paper className='w-full max-w-[600px] p-2'>
            <Skeleton height={30} />
            <Skeleton height={30} />
            <Skeleton height={30} />
          </Paper> :
          <TaskList tasks={data!}/>}
      </Stack>
      <CreateTaskButton />
    </>
  )
}