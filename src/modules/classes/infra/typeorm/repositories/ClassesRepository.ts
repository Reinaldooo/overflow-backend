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
    const startOfToday = new Date().setHours(0, 0, 0, 0);
    const startOfTodayISO: string = new Date(startOfToday).toISOString();

    const teaching = await this.ormRepo
      .createQueryBuilder("class")
      .where("class.tutorId = :userId", { userId })
      .andWhere("class.date >= :startOfTodayISO", { startOfTodayISO })
      .leftJoin("class.techs", "tech")
      .leftJoin("class.students", "student")
      .select("class")
      .addSelect("tech.name")
      .addSelect("tech.image")
      .addSelect("student.name")
      .addSelect("student.avatar")
      .getMany();

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
    const classes = await this.ormRepo
      .createQueryBuilder("class")
      .where("class.tutorId = :tutorId", { tutorId })
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
    const techsRank = await this.ormRepo
      .createQueryBuilder("class")
      .leftJoin("class.techs", "techs")
      .select("techs.id", "techid")
      .addSelect("techs.name", "name")
      .addSelect("techs.image", "techimage")
      .addSelect("COUNT(techs.id)", "amount")
      .groupBy("techid")
      .orderBy("amount", "DESC")
      .limit(6)
      .getRawMany();

    return techsRank;
  }

  public async listTopTutors(): Promise<ITopRankModel[]> {
    const tutorsRank = await this.ormRepo
      .createQueryBuilder("class")
      .leftJoin("class.tutor", "tutor")
      .select("tutor.id", "tutorid")
      .addSelect("tutor.name", "name")
      .addSelect("tutor.avatar", "avatar")
      .addSelect("COUNT(tutor.id)", "amount")
      .groupBy("tutorid")
      .orderBy("amount", "DESC")
      .limit(6)
      .getRawMany();

    return tutorsRank;
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
