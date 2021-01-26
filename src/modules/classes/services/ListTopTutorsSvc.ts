import { differenceInMinutes } from "date-fns";
import { injectable, inject } from "tsyringe";
//
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import IClassesRepository, {
  ITopRankModel,
} from "../repositories/IClassesRepository";

@injectable()
export default class ListTopTutorsSvc {
  // DESCRIPTION
  // Returns tutors rank by number of active classes
  constructor(
    @inject("ClassesRepository")
    private classesRepository: IClassesRepository,
    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  public async execute(): Promise<ITopRankModel[]> {
    const [cachedTutorsRank, cacheTime] = await Promise.all([
      await this.cacheProvider.get("tutorsRank"),
      await this.cacheProvider.get("tutorsRankTime"),
    ]);

    const cacheAge = differenceInMinutes(Date.now(), Number(cacheTime));

    // If for some reason the queue stop working, this check will prevent the
    // server from querying old cached info.
    if (cachedTutorsRank && cacheAge <= 5) {
      return JSON.parse(cachedTutorsRank);
    }

    const topTutors = await this.classesRepository.listTopTutors();

    return topTutors;
  }
}
