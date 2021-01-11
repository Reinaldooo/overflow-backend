import { getRepository, Repository, Raw } from "typeorm";
//
import IClassesRepository, {
  IFindAllByUserIdModel,
} from "@modules/classes/repositories/IClassesRepository";
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

  public async findAllByUserId(
    userId: string
  ): Promise<IFindAllByUserIdModel | undefined> {
    const teaching = await this.ormRepo.find({
      where: { tutorId: userId },
    });
    const studying = await this.ormRepo
      .createQueryBuilder("class")
      .innerJoin("class.students", "student", "student.id = :id", {
        id: userId,
      })
      .getMany();
    return { teaching, studying };
  }

  public async findTutorClasses(tutorId: string): Promise<Class[] | undefined> {
    const classes = await this.ormRepo.find({
      where: { tutorId },
    });
    return classes;
  }

  public async create(data: ICreateClassDTO): Promise<Class> {
    const _class = this.ormRepo.create(data);
    await this.ormRepo.save(_class);
    return _class;
  }
}
