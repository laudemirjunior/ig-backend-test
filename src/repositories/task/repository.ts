import { getRepository, Repository } from "typeorm";
import { TaskEntity } from "../../entities";
import { ITask, ITaskRepository } from "./interfaces";

class TaskRepository implements ITaskRepository {
  private ormRepository: Repository<TaskEntity>;

  constructor() {
    this.ormRepository = getRepository(TaskEntity);
  }

  saveTask = async (task: ITask) => {
    return await this.ormRepository.save(task);
  };
  findTask = async (key: string, value: string) =>
    await this.ormRepository.findOne({ [key]: value });
  findTaskWithUser = async (id: string) => {
    return await this.ormRepository.findOne({
      where: { id },
      relations: ["user"],
    });
  };
  findAllTask = async (key: string, value: string) =>
    await this.ormRepository.find({ [key]: value });
  updateTask = async (id: string, update: { [x: string]: unknown }) =>
    await this.ormRepository.update(id, update);
  deleteTask = async (id: string) => await this.ormRepository.delete({ id });
}

export { TaskRepository, ITask };
