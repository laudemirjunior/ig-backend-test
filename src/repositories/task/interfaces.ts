import { DeleteResult, UpdateResult } from "typeorm";
import { IUser } from "../user/interfaces";

interface ITask {
  user: IUser;
  id: string;
  created_at: Date;
  title: string;
  done: boolean;
  date: Date;
}

interface ITaskRepository {
  saveTask: (task: ITask) => Promise<ITask>;
  findTask: (key: string, value: string) => Promise<ITask>;
  findTaskWithUser: (key: string, value: string) => Promise<ITask>;
  findAllTask: (key: string, value: string) => Promise<ITask[]>;
  updateTask: (id: string, update: { name: string }) => Promise<UpdateResult>;
  deleteTask: (uuid: string) => Promise<DeleteResult>;
}
export { ITask, ITaskRepository };
