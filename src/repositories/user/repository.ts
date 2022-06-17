import { getRepository, Repository } from "typeorm";
import { UserEntity } from "./../../entities/user.entity";
import { CreationUser, IUser, IUserRepository } from "./interfaces";

class UserRepository implements IUserRepository {
  private ormRepository: Repository<UserEntity>;

  constructor() {
    this.ormRepository = getRepository(UserEntity);
  }
  createUser = (user: CreationUser) => this.ormRepository.create(user);
  saveUser = async (user: IUser) => this.ormRepository.save(user);
  findUser = async (email: string) => {
    return await this.ormRepository.findOne({
      where: { email },
      relations: ["tasks"],
    });
  };
  updateUser = async (id: string, update: { [x: string]: unknown }) =>
    await this.ormRepository.update(id, update);
}

export { UserRepository, IUser, CreationUser };
