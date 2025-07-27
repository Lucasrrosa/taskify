import TaskCompleteCheckbox from '@/modules/tasks/components/TaskList/components/TaskCompleteCheckbox'
import TaskTitle from '@/modules/tasks/components/TaskList/components/TaskTitle'
import type { ITaskResponseDto } from '@/modules/tasks/dtos/ITaskResponse.dto'
import { useDeleteTask } from '@/modules/tasks/hooks/useDeleteTask'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material'

type Props = {
  task: ITaskResponseDto
}

export default function TaskItem({ task }: Props) {
  const deleteMutate = useDeleteTask(task.id)
  return (
    <ListItem
      key={task.id}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => deleteMutate.mutate()}>
          <DeleteIcon />
        </IconButton>
      }
    >
       <ListItemIcon>
          <TaskCompleteCheckbox task={task} />
        </ListItemIcon>
      <ListItemText primary={<TaskTitle task={task} />} secondary={task.description} />
    </ListItem>
  )
}