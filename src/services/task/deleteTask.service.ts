import { TaskRepository } from "../../repositories";
import { ErrorHandler } from "../../utils";

export const deleteTaskService = async (id: string) => {
  try {
    const task = await new TaskRepository().deleteTask(id);

    return task;
  } catch (error) {
    throw new ErrorHandler(400, "Bad Request");
  }
};
