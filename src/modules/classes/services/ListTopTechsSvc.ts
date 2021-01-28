import { injectable, inject } from "tsyringe";
import { differenceInMinutes } from "date-fns";
//
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import IClassesRepository, {
  ITopRankModel,
} from "../repositories/IClassesRepository";

@injectable()
export default class ListTopTechsSvc {
  // DESCRIPTION
  // Returns techs rank by number of active classes
  constructor(
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository,
    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  public async execute(): Promise<ITopRankModel[]> {
    const [cachedTechsRank, cacheTime] = await Promise.all([
      this.cacheProvider.get("techsRank"),
      this.cacheProvider.get("techsRankTime"),
    ]);

    const cacheAge = differenceInMinutes(Date.now(), Number(cacheTime));

    // If for some reason the queue stop working, this check will prevent the
    // server from querying old cached info.
    if (cachedTechsRank && cacheAge <= 5) {
      return JSON.parse(cachedTechsRank);
    }

    const topTechs = await this.classesRepository.listTopTechs();

    return topTechs;
  }
}
