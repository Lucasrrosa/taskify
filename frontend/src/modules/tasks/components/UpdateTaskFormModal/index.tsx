import UpdateForm from '@/modules/tasks/components/UpdateTaskFormModal/components/UpdateForm'
import type { ITaskResponseDto } from '@/modules/tasks/dtos/ITaskResponse.dto'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'

type Props = {
  task: ITaskResponseDto | null
  onClose: () => void
}

export default function UpdateTaskFormModal({ task, onClose }: Props) {
  const editModalOpen = !!task
  return (
    <Dialog open={editModalOpen} onClose={onClose} maxWidth='md'>
      <DialogTitle>{task?.title}</DialogTitle>
      <DialogContent className='p-4 min-w-md'>
        <UpdateForm task={task!} onClose={onClose} />
      </DialogContent>
    </Dialog>
  )
}