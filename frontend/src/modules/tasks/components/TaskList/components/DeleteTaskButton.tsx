import type { ITaskResponseDto } from '@/modules/tasks/dtos/ITaskResponse.dto'
import { useDeleteTask } from '@/modules/tasks/hooks/useDeleteTask'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'

type Props = {
  task: ITaskResponseDto 
}

export default function DeleteTaskButton({ task} : Props) {
  const deleteMutate = useDeleteTask(task.id)
  return (
    <IconButton edge="end" aria-label="delete" onClick={() => deleteMutate.mutate()}>
          <DeleteIcon />
        </IconButton>
  )
}