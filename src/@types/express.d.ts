import { UserEntity } from "./../entities/user.entity";

declare global {
  namespace Express {
    interface Request {
      validated: UserEntity;
      token: string;
      email: string;
    }
  }
}
