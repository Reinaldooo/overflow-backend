import { injectable, inject } from "tsyringe";
//
import ITechsRepository, {
  ITopTechsModel,
} from "../repositories/ITechsRepository";

@injectable()
export default class ListTopTechsSvc {
  constructor(
    @inject("TechsRepository")
    private techsRepository: ITechsRepository
  ) {}

  public async execute(): Promise<ITopTechsModel[]> {
    const topTechs = await this.techsRepository.listTopTechs();

    return topTechs;
  }
}
