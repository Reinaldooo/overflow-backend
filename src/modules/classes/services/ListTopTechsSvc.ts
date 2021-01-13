import { injectable, inject } from "tsyringe";
//
import IClassesRepository, {
  ITopTechsModel,
} from "../repositories/IClassesRepository";

@injectable()
export default class ListTopTechsSvc {
  constructor(
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository
  ) {}

  public async execute(): Promise<ITopTechsModel[]> {
    const topTechs = await this.classesRepository.listTopTechs();

    return topTechs;
  }
}
