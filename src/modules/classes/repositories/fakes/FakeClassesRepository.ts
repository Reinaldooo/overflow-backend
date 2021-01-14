import { v4 as uuidv4 } from "uuid";
import { isEqual } from "date-fns";
//
import IClassesRepository, {
  IFindAllByUserIdModel,
  ITopRankModel,
} from "@modules/classes/repositories/IClassesRepository";
import ICreateClassDTO from "@modules/classes/dtos/ICreateClassDTO";
import IUpdateClassDTO from "@modules/classes/dtos/IUpdateClassDTO";
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
      _class => isEqual(_class.date, date) && _class.tutor.id === tutorId
    );
    return foundClass;
  }

  public async findAllByUserId(
    userId: string
  ): Promise<IFindAllByUserIdModel | undefined> {
    const teaching = this.classes.filter(_class => _class.tutor.id === userId);
    const studying = this.classes.filter(_class =>
      _class.students.find(s => s.id === userId)
    );
    return { teaching, studying };
  }

  public async findTutorClasses(tutorId: string): Promise<Class[] | undefined> {
    return this.classes.filter(_class => _class.tutor.id === tutorId);
  }

  public async findByTechName(techName: string): Promise<Class[] | undefined> {
    return this.classes.filter(_class =>
      _class.techs.find(t => t.name === techName)
    );
  }

  public async listTopTechs(): Promise<ITopRankModel[]> {
    let result = [];
    let techsCount = {};
    for (let _class of this.classes) {
      _class.techs.forEach(el => {
        techsCount[el.name] = techsCount[el.name] + 1 || 1;
      });
    }
    for (let tech in techsCount) {
      result.push({
        name: tech,
        amount: String(techsCount[tech]),
      });
    }
    return result;
  }

  public async listTopTutors(): Promise<ITopRankModel[]> {
    let tutorsCount = [];
    for (let _class of this.classes) {
      let tutorIdx = tutorsCount.findIndex(t => t.tutorid === _class.tutor.id);
      if (tutorIdx > -1) {
        tutorsCount[tutorIdx].amount++;
        continue;
      }
      let tmp = {
        name: _class.tutor.name,
        amount: 1,
        tutorid: _class.tutor.id,
      };
      tutorsCount.push(tmp);
    }
    return tutorsCount;
  }

  public async create(data: ICreateClassDTO): Promise<Class> {
    const _class = new Class();
    Object.assign(_class, { id: uuidv4(), ...data, students: [] });
    this.classes.push(_class);
    return _class;
  }

  public async save(_class: Class): Promise<Class> {
    const classIdx = this.classes.findIndex(cls => cls.id === _class.id);
    classIdx > -1
      ? this.classes.splice(classIdx, 1, _class)
      : this.classes.push(_class);
    return _class;
  }

  public async update(data: IUpdateClassDTO): Promise<Class> {
    const _class = this.classes.find(c => c.id === data.id);
    Object.assign(_class, { ...data });
    this.save(_class);
    return _class;
  }
}
