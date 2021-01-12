import { getRepository, In, Repository } from "typeorm";
//
import ITechsRepository, {
  ITopTechsModel,
} from "@modules/techs/repositories/ITechsRepository";
import ICreateTechDTO from "@modules/techs/dtos/ICreateTechDTO";
import Tech from "../entities/Tech";

export default class TechsRepository implements ITechsRepository {
  // By using the 'implements', this repo will follow the "rules" set by
  // that interface

  private ormRepo: Repository<Tech>;

  constructor() {
    this.ormRepo = getRepository(Tech);
  }

  public async findByNames(names: string[]): Promise<Tech[] | undefined> {
    return await this.ormRepo.find({ where: { name: In(names) } });
  }

  public async listTopTechs(): Promise<ITopTechsModel[]> {
    let techsRank = await this.ormRepo
      .createQueryBuilder("tech")
      .leftJoin("tech.classes", "classes")
      .select("tech.name", "name")
      .addSelect("COUNT(*)", "amount")
      .groupBy("name")
      .orderBy("amount", "DESC")
      .limit(10)
      .getRawMany();

    return techsRank;
  }

  public async create(data: ICreateTechDTO): Promise<Tech> {
    const tech = this.ormRepo.create(data);
    await this.ormRepo.save(tech);
    return tech;
  }

  public async save(tech: Tech): Promise<Tech> {
    return this.ormRepo.save(tech);
  }
}
