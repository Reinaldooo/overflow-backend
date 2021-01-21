import { injectable, inject } from "tsyringe";
//
import IClassesRepository, {
  IFindAllByUserIdModel,
} from "@modules/classes/repositories/IClassesRepository";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";

@injectable()
export default class ListMyClassesSvc {
  // DESCRIPTION
  // Returns teaching and studying classes for the logged user
  constructor(
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository,
    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  public async execute(userId: string): Promise<IFindAllByUserIdModel> {
    const key = `activeClasses/${userId}`;

    const cachedClasses = await this.cacheProvider.get(key);

    if (cachedClasses) {
      return JSON.parse(cachedClasses);
    }

    const classes = await this.classesRepository.findAllByUserId(userId);

    await this.cacheProvider.save(key, JSON.stringify(classes));

    return classes;
  }
}
