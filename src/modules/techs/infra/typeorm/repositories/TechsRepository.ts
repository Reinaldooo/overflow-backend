import { getRepository, In, Like, Repository } from "typeorm";
//
import ITechsRepository from "@modules/techs/repositories/ITechsRepository";
import ICreateTechDTO from "@modules/techs/dtos/ICreateTechDTO";
import Tech from "../entities/Tech";

export default class TechsRepository implements ITechsRepository {
  // By using the 'implements', this repo will follow the "rules" set by
  // that interface

  private ormRepo: Repository<Tech>;

  constructor() {
    this.ormRepo = getRepository(Tech);
  }

  public async findByExactNames(names: string[]): Promise<Tech[] | undefined> {
    return await this.ormRepo.find({ where: { name: In(names) } });
  }

  public async findByName(searchName: string): Promise<Tech[]> {
    return await this.ormRepo.find({
      where: { name: Like(`%${searchName}%`) },
    });
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
