import type { ITaskResponseDto } from '@/modules/tasks/dtos/ITaskResponse.dto'
import { TaskStatusEnum } from '@/modules/tasks/enums/TaskEnum'
import { useUpdateTask } from '@/modules/tasks/hooks/useUpdateTask'
import { Checkbox } from '@mui/material'

type Props = {
  task: ITaskResponseDto
}

export default function TaskCompleteCheckbox({ task }: Props) {

  const updateTask = useUpdateTask()

  const handleChange = () => {
    const newStatus = task.status === TaskStatusEnum.COMPLETED ? TaskStatusEnum.PENDING : TaskStatusEnum.COMPLETED
    updateTask.mutate({ ...task, status: newStatus })
  }
  return (
    <Checkbox
      id={`task-complete-checkbox-${task.id}`}
      edge="start"
      checked={task.status === TaskStatusEnum.COMPLETED}
      tabIndex={-1}
      onChange={handleChange}
      disableRipple
    />
  )
}