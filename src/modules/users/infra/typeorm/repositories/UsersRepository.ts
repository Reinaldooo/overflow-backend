import { getRepository, Like, Repository } from "typeorm";
//
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import User from "../entities/User";

export default class UsersRepository implements IUsersRepository {
  // By using the 'implements', this repo will follow the "rules" set by
  // that interface

  private ormRepo: Repository<User>;

  constructor() {
    this.ormRepo = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    return await this.ormRepo.findOne(id);
  }

  public async findByIdWithClasses(id: string): Promise<User | undefined> {
    return await this.ormRepo.findOne({
      where: {
        id,
      },
      relations: ["teaching", "studying"],
    });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return await this.ormRepo.findOne({ where: { email } });
  }

  public async findByName(searchName: string): Promise<User[]> {
    return await this.ormRepo.find({
      where: { name: Like(`%${searchName}%`) },
    });
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepo.create(data);
    await this.ormRepo.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepo.save(user);
  }
}
