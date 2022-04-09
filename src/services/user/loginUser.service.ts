import bcrypt from "bcryptjs";
import JsonWebToken from "jsonwebtoken";
import { jwtConfig } from "../../configs";
import { IUser, UserRepository } from "../../repositories";
import { ErrorHandler } from "../../utils";

export const loginUserService = async (email: string, password: string) => {
  const user: IUser = await new UserRepository().findUser(email);

  if (!user) {
    throw new ErrorHandler(401, "Wrong email/password");
  }

  if (user) {
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new ErrorHandler(401, "Wrong email/password");
    }

    const token = JsonWebToken.sign({ email }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });

    return token;
  }
};
