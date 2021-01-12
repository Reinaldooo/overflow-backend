import Tech from "../infra/typeorm/entities/Tech";
import ICreateTechDTO from "../dtos/ICreateTechDTO";

export interface ITopTechsModel {
  name: string;
  amount: string;
}

export default interface ITechsRepository {
  findByNames(names: string[]): Promise<Tech[] | undefined>;
  listTopTechs(): Promise<ITopTechsModel[]>;
  create(data: ICreateTechDTO): Promise<Tech>;
  save(tech: Tech): Promise<Tech>;
}
