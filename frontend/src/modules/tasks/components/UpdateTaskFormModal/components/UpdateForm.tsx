import FormTextField from '@/components/form-fields/FormTextField'
import type { ITaskResponseDto } from '@/modules/tasks/dtos/ITaskResponse.dto'
import { TaskStatusEnum } from '@/modules/tasks/enums/TaskEnum'
import { useUpdateTask } from '@/modules/tasks/hooks/useUpdateTask'
import { updateTaskSchema, type UpdateTaskSchema } from '@/modules/tasks/schemas/update-task.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, FormControlLabel, Stack } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

type Props = {
  task: ITaskResponseDto
  onClose: () => void
}

export default function UpdateForm({ task, onClose }: Props) {
  const { control, handleSubmit } = useForm<UpdateTaskSchema>({
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
    },
    resolver: zodResolver(updateTaskSchema)
  })

  const updateTask = useUpdateTask()

  const onSubmit = async (data: UpdateTaskSchema) => {
    await updateTask.mutate({
      id: task.id,
      description: data.description,
      status: data.status,
    })
    onClose()
  }

  return (
    <Stack component="form" gap={2} direction='column' onSubmit={handleSubmit(onSubmit)}>
      <FormTextField
        control={control}
        name="title"
        label="Título"
      />
      <FormTextField
        control={control}
        name="description"
        label="Descrição"
      />
      <Controller
        control={control}
        name='status'
        render={({ field: { value, onChange } }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={value === TaskStatusEnum.COMPLETED}
                onChange={(_, checked) =>  onChange(checked ? TaskStatusEnum.COMPLETED : TaskStatusEnum.PENDING)}
              />
            }
            label='Tarefa Completa'
          />
        )}
      />
      <Stack direction='row' justifyContent='flex-end'>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant='contained' type="submit">Salvar</Button>
      </Stack>
    </Stack>
  )
}