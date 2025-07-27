import DeleteTaskButton from '@/modules/tasks/components/TaskList/components/DeleteTaskButton'
import TaskCompleteCheckbox from '@/modules/tasks/components/TaskList/components/TaskCompleteCheckbox'
import TaskTitle from '@/modules/tasks/components/TaskList/components/TaskTitle'
import type { ITaskResponseDto } from '@/modules/tasks/dtos/ITaskResponse.dto'
import { ListItem, ListItemIcon, ListItemText } from '@mui/material'

type Props = {
  task: ITaskResponseDto
}

export default function TaskItem({ task }: Props) {
  return (
    <ListItem
      key={task.id}
      secondaryAction={
        <DeleteTaskButton task={task}/>
      }
    >
       <ListItemIcon>
          <TaskCompleteCheckbox task={task} />
        </ListItemIcon>
      <ListItemText primary={<TaskTitle task={task} />} secondary={task.description} />
    </ListItem>
  )
}