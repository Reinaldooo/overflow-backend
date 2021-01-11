import { injectable, inject } from "tsyringe";

import IClassesRepository, {
  IFindAllByUserIdModel,
} from "@modules/classes/repositories/IClassesRepository";

@injectable()
export default class ListUserClassesSvc {
  constructor(
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository
  ) {}

  public async execute(userId: string): Promise<IFindAllByUserIdModel> {
    const classes = await this.classesRepository.findAllByUserId(userId);

    return classes;
  }
}
