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

  public async findById(id: string): Promise<Class | undefined> {
    const foundClass = this.classes.find(_class => _class.id === id);
    return foundClass;
  }

  public async findByDate(
    date: Date,
    tutorId: string
  ): Promise<Class | undefined> {
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

  public async findTutorClasses(tutorId: string): Promise<Class[] | undefined> {
    return this.classes.filter(_class => _class.tutorId === tutorId);
  }

  public async findByTechName(techName: string): Promise<Class[] | undefined> {
    return this.classes.filter(_class =>
      _class.techs.find(t => t.name === techName)
    );
  }

  public async create(data: ICreateClassDTO): Promise<Class> {
    const _class = new Class();
    Object.assign(_class, { id: uuidv4(), ...data, students: [] });
    this.classes.push(_class);
    return _class;
  }

  public async save(_class: Class): Promise<Class> {
    const classIdx = this.classes.findIndex(cls => (cls.id = _class.id));
    classIdx ? (this.classes[classIdx] = _class) : this.classes.push(_class);
    return _class;
  }
}
