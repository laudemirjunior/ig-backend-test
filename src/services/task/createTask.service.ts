import {
  ITask,
  IUser,
  TaskRepository,
  UserRepository,
} from "../../repositories";
import { ErrorHandler } from "../../utils";

export const createTaskService = async (body: ITask, email: string) => {
  try {
    delete body.id;
    delete body.created_at;

    const user: IUser = await new UserRepository().findUser(email);

    const newTask: ITask = await new TaskRepository().saveTask(body);

    user.tasks = [...user.tasks, newTask];

    await new UserRepository().saveUser(user);

    const task: ITask = await new TaskRepository().findTask("id", body.id);

    return task;
  } catch (error) {
    throw new ErrorHandler(400, "Bad Request");
  }
};
