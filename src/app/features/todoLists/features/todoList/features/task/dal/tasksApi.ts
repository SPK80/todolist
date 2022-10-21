import {instance} from "common/dal/instance";
import {
  axiosErrorToString, checkErrorAndGetItems,
  checkResultCodeAndGetData, getDataFromAxiosResponse,
  ResponseWithErrorType,
  ResponseWithResultCodeType
} from "common/dal/parseResponse";

export const tasksApi = {
  //=============TASKS================================================================================================
  
  async getTasks(todolistId: string) {
    return instance.get<ResponseWithErrorType<TaskType>>(`todo-lists/${todolistId}/tasks`)
      .then(getDataFromAxiosResponse)
      .then(checkErrorAndGetItems)
      .catch(axiosErrorToString)
  },
  
  async createTask(todolistId: string, title: string) {
    return instance.post<ResponseWithResultCodeType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
      .then(getDataFromAxiosResponse)
      .then(checkResultCodeAndGetData)
      .catch(axiosErrorToString)
  },
  
  async removeTask(taskId: string, todoListId: string) {
    return instance.delete<ResponseWithResultCodeType>(`todo-lists/${todoListId}/tasks/${taskId}`)
      .then(getDataFromAxiosResponse)
      .then(checkResultCodeAndGetData)
      .catch(axiosErrorToString)
  },
  
  async updateTask(taskId: string, todoListId: string, updatingModel: UpdateDomainTaskModelType) {
    return instance.put<ResponseWithResultCodeType>(`todo-lists/${todoListId}/tasks/${taskId}`, updatingModel)
      .then(getDataFromAxiosResponse)
      .then(checkResultCodeAndGetData)
      .catch(axiosErrorToString)
  },
  
}

//===Types==============================================================================================================
export type TaskType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4
}
