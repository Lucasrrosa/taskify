import type { ITaskResponseDto } from '@/modules/tasks/dtos/ITaskResponse.dto'
import { useUpdateTask } from '@/modules/tasks/hooks/useUpdateTask'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'

type Props = {
  task: ITaskResponseDto
}

export default function TaskTitle({ task }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(task.title)
  const updateTask = useUpdateTask()
  const handleUpdate = () => {
    updateTask.mutate({ ...task, title: newTitle })
    setIsEditing(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setNewTitle(task.title)
  }

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      {isEditing ? (
        <TextField value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
      ) : (
        <Typography variant='body1'>{task.title}</Typography>
      )}
      {isEditing && <IconButton onClick={handleCancel}>
        <CloseIcon />
      </IconButton>}
      <IconButton onClick={isEditing ? handleUpdate : handleEdit}>
        {isEditing ? <CheckIcon /> : <EditIcon />}
      </IconButton>
    </Stack>
  )
}