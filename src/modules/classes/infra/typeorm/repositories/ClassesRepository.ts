import { getRepository, Repository, DeleteResult } from "typeorm";
//
import IClassesRepository, {
  IFindAllByUserIdModel,
  ITopRankModel,
} from "@modules/classes/repositories/IClassesRepository";
import ICreateClassDTO from "@modules/classes/dtos/ICreateClassDTO";
import IUpdateClassDTO from "@modules/classes/dtos/IUpdateClassDTO";
import Class from "../entities/Class";

export default class ClassesRepository implements IClassesRepository {
  // By using the 'implements', this repo will follow the "rules" set by
  // that interface

  private ormRepo: Repository<Class>;

  constructor() {
    this.ormRepo = getRepository(Class);
  }

  public async findById(id: string): Promise<Class | undefined> {
    const _class = await this.ormRepo.findOne(id);
    return _class;
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
      .innerJoinAndSelect("class.techs", "techs")
      .getMany();

    return { teaching, studying };
  }

  public async findTutorClasses(tutorId: string): Promise<Class[] | undefined> {
    const classes = await this.ormRepo.find({
      where: { tutorId },
    });
    return classes;
  }

  public async findByTechName(techName: string): Promise<Class[] | undefined> {
    const classes = await this.ormRepo
      .createQueryBuilder("class")
      .leftJoin("class.techs", "techSearch")
      .where("techSearch.name = :techName", { techName })
      // The first left join on techs will get only the tech that is being searched,
      // so i make a second join to get other techs on the class
      .leftJoin("class.techs", "tech")
      .leftJoin("class.students", "student")
      .select("class")
      .addSelect("tech.name")
      .addSelect("tech.image")
      .addSelect("student.name")
      .addSelect("student.avatar")
      .getMany();

    return classes;
  }

  public async listTopTechs(): Promise<ITopRankModel[]> {
    let techsRank = await this.ormRepo
      .createQueryBuilder("class")
      .leftJoin("class.techs", "techs")
      .select("techs.name", "name")
      .addSelect("COUNT(*)", "amount")
      .groupBy("name")
      .orderBy("amount", "DESC")
      .limit(10)
      .getRawMany();

    return techsRank;
  }

  public async listTopTutors(): Promise<ITopRankModel[]> {
    let techsRank = await this.ormRepo
      .createQueryBuilder("class")
      .leftJoin("class.tutor", "tutor")
      .select("tutor.id", "tutorid")
      .addSelect("tutor.name", "name")
      .addSelect("COUNT(tutor.id)", "amount")
      .groupBy("tutorid")
      .orderBy("amount", "DESC")
      .limit(10)
      .getRawMany();

    return techsRank;
  }

  public async create(data: ICreateClassDTO): Promise<Class> {
    const _class = this.ormRepo.create(data);
    await this.ormRepo.save(_class);
    return _class;
  }

  public async save(_class: Class): Promise<Class> {
    return await this.ormRepo.save(_class);
  }

  public async update({
    id,
    date,
    description,
    techs,
  }: IUpdateClassDTO): Promise<Class> {
    const updatedClass = await this.ormRepo.findOne(id);
    Object.assign(updatedClass, { date, description, techs });
    await this.save(updatedClass);
    return updatedClass;
  }

  public async delete(id: string): Promise<boolean> {
    await this.ormRepo.delete(id);
    return true;
  }
}
