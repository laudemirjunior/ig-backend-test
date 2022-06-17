import { ITask, TaskRepository } from "../../repositories";
import { ErrorHandler } from "../../utils";

export const retrieveTaskByIdService = async (id: string) => {
  try {
    const task: ITask = await new TaskRepository().findTask("id", id);
    return task;
  } catch (error) {
    throw new ErrorHandler(400, "Bad Request");
  }
};
