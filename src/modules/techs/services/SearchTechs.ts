import { injectable, inject } from "tsyringe";
//
import Tech from "../infra/typeorm/entities/Tech";
import AppError from "@shared/errors/AppError";
import ITechsRepository from "../repositories/ITechsRepository";

@injectable()
export default class SearchTechs {
  constructor(
    @inject("TechsRepository")
    private techsRepository: ITechsRepository
  ) {}

  public async execute(searchName: string): Promise<Tech[]> {
    if (!searchName) {
      // throw errors in here and send them back in the route
      throw new AppError("Invalid search.");
    }
    if (searchName.length < 3) {
      // throw errors in here and send them back in the route
      throw new AppError("Please include at least 3 chars.");
    }

    const foundTechs = this.techsRepository.findByName(searchName);

    return foundTechs;
  }
}
