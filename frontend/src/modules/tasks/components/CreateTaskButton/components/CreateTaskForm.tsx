import FormMultilineField from '@/components/form-fields/FormMultilineField'
import FormTextField from '@/components/form-fields/FormTextField'
import type { ICreateTaskDto } from '@/modules/tasks/dtos/ICreateTask.dto'
import { createTaskSchema, type CreateTaskSchema } from '@/modules/tasks/schemas/create-task.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'

type Props = {
  onSubmit: (data: ICreateTaskDto) => void
  open: boolean
  onClose: () => void
}

export default function CreateTaskForm({ onSubmit, open, onClose }: Props) {
  const { control, handleSubmit, reset } = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
  })

  const onSubmitHandler = (data: CreateTaskSchema) => {
    onSubmit({
      title: data.title,
      description: data.description,
    })
    reset()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md'>
      <DialogTitle>Criar Tarefa</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText>
            Preencha os campos abaixo para criar uma nova tarefa.
          </DialogContentText>
          <Stack component="form" gap={2} direction='column' onSubmit={handleSubmit(onSubmitHandler)}>
            <FormTextField
              control={control}
              name="title"
              label="Título"
              fullWidth
            />
            <FormMultilineField
              control={control}
              name="description"
              label="Descrição"
              fullWidth
            />
            <DialogActions>
            <Button onClick={onClose}>Cancelar</Button>
            <Button variant='contained' type="submit">Criar</Button>
          </DialogActions>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}