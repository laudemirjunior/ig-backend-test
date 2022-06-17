import { UserRepository } from "../../repositories";
import { ErrorHandler } from "../../utils";

export const retrieveTasksService = async (email: string) => {
  try {
    const user = await new UserRepository().findUser(email);
    return user.tasks;
  } catch (error) {
    throw new ErrorHandler(400, "Bad Request");
  }
};
