import { getRepository, Repository, Raw } from "typeorm";
//
import IClassesRepository from "@modules/classes/repositories/IClassesRepository";
import ICreateClassDTO from "@modules/classes/dtos/ICreateClassDTO";
import Class from "../entities/Class";

export default class ClassesRepository implements IClassesRepository {
  // By using the 'implements', this repo will follow the "rules" set by
  // that interface

  private ormRepo: Repository<Class>;

  constructor() {
    this.ormRepo = getRepository(Class);
  }

  public async findByDate(
    date: Date,
    tutorId: string
  ): Promise<Class | undefined> {
    const _class = await this.ormRepo.findOne({
      where: { date, tutorId },
    });
    return _class;
  }

  public async create({ tutorId, date }: ICreateClassDTO): Promise<Class> {
    const _class = this.ormRepo.create({ tutorId, date });
    await this.ormRepo.save(_class);
    return _class;
  }
}
