import { IUser, UserRepository } from "../../repositories";
import { ErrorHandler } from "../../utils";

export const updateUserService = async (email: string, name: string) => {
  try {
    const userId: IUser = await new UserRepository().findUser(email);

    await new UserRepository().updateUser(userId.id, { name });

    return;
  } catch {
    throw new ErrorHandler(400, "Estimated parameter not found");
  }
};
