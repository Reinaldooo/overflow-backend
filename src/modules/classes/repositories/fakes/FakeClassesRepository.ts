import { v4 as uuidv4 } from "uuid";
import { getMonth, getYear, isEqual } from "date-fns";
//
import IClassesRepository from "@modules/classes/repositories/IClassesRepository";
import ICreateClassDTO from "@modules/classes/dtos/ICreateClassDTO";
import Class from "../../infra/typeorm/entities/Class";

export default class FakeClassesRepository implements IClassesRepository {
  private classes: Class[] = [];
  public async findByDate(date: Date, tutorId): Promise<Class | undefined> {
    const foundClass = this.classes.find(
      _class => isEqual(_class.date, date) && _class.tutorId === tutorId
    );
    return foundClass;
  }

  public async create({ tutorId, date }: ICreateClassDTO): Promise<Class> {
    const _class = new Class();
    Object.assign(_class, { id: uuidv4(), date, tutorId });
    this.classes.push(_class);
    return _class;
  }
}
