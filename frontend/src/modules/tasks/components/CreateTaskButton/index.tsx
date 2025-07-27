import CreateTaskForm from '@/modules/tasks/components/CreateTaskButton/components/CreateTaskForm'
import type { ICreateTaskDto } from '@/modules/tasks/dtos/ICreateTask.dto'
import { useCreateTask } from '@/modules/tasks/hooks/useCreateTask'
import AddIcon from '@mui/icons-material/Add'
import { Fab } from '@mui/material'
import { useState } from 'react'


export default function CreateTaskButton() {
  const createTask = useCreateTask()
  const [open, setOpen] = useState(false)

  const handleCreateTask = (data: ICreateTaskDto) => {
    createTask.mutate(data)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Fab
        onClick={() => setOpen(true)}
        className='absolute bottom-4 right-4'
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
      <CreateTaskForm
        onSubmit={handleCreateTask}
        open={open}
        onClose={handleClose}
      />
    </>
  )
}