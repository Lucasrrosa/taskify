import { TasksRequests } from '@/modules/tasks/requests/TasksRequests'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteTask(id: number) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async () => {
      await TasksRequests.deleteTask(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TasksRequests.TASK_REQUEST_KEY] })
    },
  })

  return mutation
}