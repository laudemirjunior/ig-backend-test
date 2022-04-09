import { IUser, UserRepository } from "../../repositories";
import { ErrorHandler } from "../../utils";

export const updateUserService = async (email: string, name: string) => {
  try {
    const user: IUser = await new UserRepository().findUser(email);

    await new UserRepository().updateUser(user.id, { name });

    const updateUser: IUser = await new UserRepository().findUser(email);

    delete updateUser.tasks;

    delete updateUser.password;

    return updateUser;
  } catch {
    throw new ErrorHandler(400, "Estimated parameter not found");
  }
};
