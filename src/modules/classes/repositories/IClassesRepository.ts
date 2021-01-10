import Class from "../infra/typeorm/entities/Class";
import ICreateClassDTO from "../dtos/ICreateClassDTO";

// This interface works as a "guideline" for all the methods the classes repo
// needs. It shouldn't matter how it is implemented on the actual repo, nor
// if it is SQL or NoSQL and etc, but it should have the methods below
export default interface IClassesRepository {
  create(data: ICreateClassDTO): Promise<Class>;
  findByDate(date: Date, tutorId: string): Promise<Class | undefined>;
}
