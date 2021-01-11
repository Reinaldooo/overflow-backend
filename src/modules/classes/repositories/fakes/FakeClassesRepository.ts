import { v4 as uuidv4 } from "uuid";
import { isEqual } from "date-fns";
//
import IClassesRepository, {
  IFindAllByUserIdModel,
} from "@modules/classes/repositories/IClassesRepository";
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

  public async findAllByUserId(
    userId: string
  ): Promise<IFindAllByUserIdModel | undefined> {
    const teaching = this.classes.filter(_class => _class.tutorId === userId);
    const studying = [];
    return { teaching, studying };
  }

  public async create(data: ICreateClassDTO): Promise<Class> {
    const _class = new Class();
    Object.assign(_class, { id: uuidv4(), ...data });
    this.classes.push(_class);
    return _class;
  }
}
