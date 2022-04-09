import { UserRepository } from "../../repositories";
import { ErrorHandler } from "../../utils";

export const retrieveTaskByDoneService = async (
  email: string,
  done: boolean
) => {
  try {
    const user: any = await new UserRepository().findUser(email);

    const tasks = user.tasks.filter((item: any) => item.done !== done);

    return tasks;
  } catch (error) {
    throw new ErrorHandler(400, "Bad Request");
  }
};
