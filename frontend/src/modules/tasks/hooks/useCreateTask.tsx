import { TasksRequests } from '@/modules/tasks/requests/TasksRequests'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateTask() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: TasksRequests.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TasksRequests.TASK_REQUEST_KEY] })
    },
  })

  return mutation
}