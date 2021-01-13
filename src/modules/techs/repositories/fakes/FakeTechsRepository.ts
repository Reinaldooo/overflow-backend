import { v4 as uuidv4 } from "uuid";
//
import ITechsRepository from "@modules/techs/repositories/ITechsRepository";
import ICreateTechDTO from "@modules/techs/dtos/ICreateTechDTO";
import Tech from "../../infra/typeorm/entities/Tech";

export default class FakeTechsRepository implements ITechsRepository {
  private techs: Tech[] = [];
  public async findByNames(names: string[]): Promise<Tech[] | undefined> {
    const found = this.techs.filter(tech => names.includes(tech.name));
    return found;
  }

  public async findTechsByName(searchName: string): Promise<Tech[]> {
    const found = this.techs.filter(tech => tech.name.includes(searchName));
    return found;
  }

  public async create(data: ICreateTechDTO): Promise<Tech> {
    const tech = new Tech();
    Object.assign(tech, { id: uuidv4(), ...data, classes: [] });
    this.techs.push(tech);
    return tech;
  }

  public async save(tech: Tech): Promise<Tech> {
    const techIdx = this.techs.findIndex(tch => tch.id === tech.id);
    techIdx > -1 ? this.techs.splice(techIdx, 1, tech) : this.techs.push(tech);
    return tech;
  }
}
