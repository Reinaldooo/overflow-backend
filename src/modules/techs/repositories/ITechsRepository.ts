import Tech from "../infra/typeorm/entities/Tech";
import ICreateTechDTO from "../dtos/ICreateTechDTO";

export default interface IUsersRepository {
  findByNames(names: string[]): Promise<Tech[] | undefined>;
  create(data: ICreateTechDTO): Promise<Tech>;
  save(tech: Tech): Promise<Tech>;
}
