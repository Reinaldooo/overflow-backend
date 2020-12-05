import { v4 as uuidv4 } from "uuid";
//
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import User from "../../infra/typeorm/entities/User";

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];
  public async findById(id: string): Promise<User | undefined> {
    const found = this.users.find(user => user.id === id);
    return found;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const found = this.users.find(user => user.email === email);
    return found;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuidv4() }, data);
    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const userIdx = this.users.findIndex(usr => (usr.id = user.id));
    userIdx ? (this.users[userIdx] = user) : this.users.push(user);
    return user;
  }
}
