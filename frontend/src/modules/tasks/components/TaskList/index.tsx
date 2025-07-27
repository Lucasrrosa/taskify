import TaskItem from '@/modules/tasks/components/TaskList/components/TaskItem'
import type { ITaskResponseDto } from '@/modules/tasks/dtos/ITaskResponse.dto'
import { List, Paper } from '@mui/material'

type Props = {
  tasks: ITaskResponseDto[]
  onEdit: (task: ITaskResponseDto) => void
}

export default function TaskList({ tasks, onEdit }: Props) {
  return (
    <List component={Paper} className='m-2 w-full max-w-[600px]'>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onEdit={onEdit} />
      ))}
    </List>
  )
}
