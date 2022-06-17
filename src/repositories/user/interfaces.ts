import { UpdateResult } from "typeorm";
import { ITask } from "../task/interfaces";

interface IUser {
  id: string;
  name: string;
  lastName: string;
  cpf: string;
  email: string;
  password: string;
  tasks: ITask[];
}

interface CreationUser {
  name: string;
  lastName: string;
  cpf: string;
  email: string;
  password: string;
}

interface IUserRepository {
  createUser: (user: CreationUser) => IUser;
  saveUser: (user: IUser) => Promise<IUser>;
  findUser: (key: string, value: string) => Promise<IUser>;
  updateUser: (
    email: string,
    update: { name: string }
  ) => Promise<UpdateResult>;
}

export { IUser, CreationUser, IUserRepository };
