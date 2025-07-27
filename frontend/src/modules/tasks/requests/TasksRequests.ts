import { api } from '@/config/api/api'
import type { ICreateTaskDto } from '@/modules/tasks/dtos/ICreateTask.dto'
import type { ITaskFilterDto } from '@/modules/tasks/dtos/ITaskFilter.dto'
import type { ITaskResponseDto } from '@/modules/tasks/dtos/ITaskResponse.dto'
import type { IUpdateTaskDto } from '@/modules/tasks/dtos/IUpdateTask.dto'
import type { AxiosResponse } from 'axios'

export class TasksRequests {

  public static TASK_REQUEST_KEY= 'tasks'

  static async getTaskList(filter: ITaskFilterDto): Promise<ITaskResponseDto[]> {
    const response = await api.get<ITaskFilterDto, AxiosResponse<ITaskResponseDto[]>>('/tasks', { params: filter })
    return response.data
  }
  static async createTask(body: ICreateTaskDto): Promise<ITaskResponseDto> {
    const response = await api.post<ICreateTaskDto, AxiosResponse<ITaskResponseDto>>('/tasks', body)
    return response.data
  }
  static async updateTask(id: number, body: IUpdateTaskDto): Promise<void> {
    await api.patch<IUpdateTaskDto, AxiosResponse<void>>(`/tasks/${id}`, body)
  }
  static async deleteTask(id: number): Promise<void> {
    await api.delete(`/tasks/${id}`)
  }
}