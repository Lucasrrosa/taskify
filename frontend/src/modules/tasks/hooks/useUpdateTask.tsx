import type { IUpdateTaskDto } from '@/modules/tasks/dtos/IUpdateTask.dto'
import { TasksRequests } from '@/modules/tasks/requests/TasksRequests'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateTask() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({id, ...body}: {id: number} & IUpdateTaskDto) => TasksRequests.updateTask(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TasksRequests.TASK_REQUEST_KEY] })
    },
  })

  return mutation
}