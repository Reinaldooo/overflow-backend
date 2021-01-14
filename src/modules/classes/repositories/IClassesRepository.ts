import Class from "../infra/typeorm/entities/Class";
import ICreateClassDTO from "../dtos/ICreateClassDTO";
import IUpdateClassDTO from "../dtos/IUpdateClassDTO";

export interface IFindAllByUserIdModel {
  teaching: Class[];
  studying: Class[];
}
export interface ITopRankModel {
  [key: string]: string;
}

// This interface works as a "guideline" for all the methods the classes repo
// needs. It shouldn't matter how it is implemented on the actual repo, nor
// if it is SQL or NoSQL and etc, but it should have the methods below
export default interface IClassesRepository {
  create(data: ICreateClassDTO): Promise<Class>;
  save(_class: Class): Promise<Class>;
  update(data: IUpdateClassDTO): Promise<Class>;
  findById(id: string): Promise<Class | undefined>;
  findByDate(date: Date, tutorId: string): Promise<Class | undefined>;
  findAllByUserId(userId: string): Promise<IFindAllByUserIdModel | undefined>;
  findTutorClasses(tutorId: string): Promise<Class[] | undefined>;
  findByTechName(techName: string): Promise<Class[] | undefined>;
  listTopTechs(): Promise<ITopRankModel[]>;
  listTopTutors(): Promise<ITopRankModel[]>;
}
