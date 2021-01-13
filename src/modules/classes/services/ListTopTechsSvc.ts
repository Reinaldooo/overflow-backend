import { injectable, inject } from "tsyringe";
//
import IClassesRepository, {
  ITopRankModel,
} from "../repositories/IClassesRepository";

@injectable()
export default class ListTopTechsSvc {
  // DESCRIPTION
  // Returns techs rank by active classes
  constructor(
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository
  ) {}

  public async execute(): Promise<ITopRankModel[]> {
    const topTechs = await this.classesRepository.listTopTechs();

    return topTechs;
  }
}
