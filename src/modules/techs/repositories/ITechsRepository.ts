import Tech from "../infra/typeorm/entities/Tech";
import ICreateTechDTO from "../dtos/ICreateTechDTO";

export default interface ITechsRepository {
  findByExactNames(names: string[]): Promise<Tech[] | undefined>;
  findByName(searchName: string): Promise<Tech[]>;
  create(data: ICreateTechDTO): Promise<Tech>;
  save(tech: Tech): Promise<Tech>;
}
