import { injectable, inject } from "tsyringe";

import IClassesRepository, {
  IFindAllByUserIdModel,
} from "@modules/classes/repositories/IClassesRepository";

@injectable()
export default class ListMyClassesSvc {
  // DESCRIPTION
  // Returns teaching and studying classes for the logged user
  constructor(
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository
  ) {}

  public async execute(userId: string): Promise<IFindAllByUserIdModel> {
    const classes = await this.classesRepository.findAllByUserId(userId);

    return classes;
  }
}
