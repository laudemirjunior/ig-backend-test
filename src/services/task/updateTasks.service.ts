import { ITask, TaskRepository } from "../../repositories";
import { ErrorHandler } from "../../utils";

export const updateTaskService = async (body: ITask, id: string) => {
  try {
    delete body.id;
    delete body.created_at;

    for (const [key, value] of Object.entries(body)) {
      await new TaskRepository().updateTask(id, {
        [key]: value,
      });
    }

    const task: ITask = await new TaskRepository().findTask("id", id);
    return task;
  } catch (error) {
    throw new ErrorHandler(400, "Bad Request");
  }
};
