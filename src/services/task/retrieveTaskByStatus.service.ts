import { UserRepository } from "../../repositories";
import { ErrorHandler } from "../../utils";

export const retrieveTaskByStatusService = async (
  email: string,
  status: string
) => {
  try {
    const user = await new UserRepository().findUser(email);

    const tasks = user.tasks.filter((item) => item.done.toString() === status);

    return tasks;
  } catch (error) {
    throw new ErrorHandler(400, "Bad Request");
  }
};
