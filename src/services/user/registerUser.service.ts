import bcrypt from "bcryptjs";
import { QueryFailedError } from "typeorm";
import { IUser, UserRepository } from "../../repositories";
import { CreationUser } from "../../repositories/user/interfaces";
import { ErrorHandler } from "../../utils";

interface IDetail extends QueryFailedError {
  detail: string;
}

export const registerUserService = async (body: CreationUser) => {
  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    body.password = hashedPassword;

    const newUser: IUser = new UserRepository().createUser(body);

    const savedUser: IUser = await new UserRepository().saveUser(newUser);

    delete savedUser.password;

    return savedUser;
  } catch (error) {
    if (error instanceof QueryFailedError) {
      const detail = (error as IDetail).detail;

      if (detail.includes("already exists")) {
        throw new ErrorHandler(409, detail);
      }
    }
  }
};
