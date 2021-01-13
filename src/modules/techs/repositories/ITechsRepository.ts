import Tech from "../infra/typeorm/entities/Tech";
import ICreateTechDTO from "../dtos/ICreateTechDTO";

export default interface ITechsRepository {
  findByNames(names: string[]): Promise<Tech[] | undefined>;
  findTechsByName(searchName: string): Promise<Tech[]>;
  create(data: ICreateTechDTO): Promise<Tech>;
  save(tech: Tech): Promise<Tech>;
}
