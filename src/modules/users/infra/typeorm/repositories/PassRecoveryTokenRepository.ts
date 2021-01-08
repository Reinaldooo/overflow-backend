import { getRepository, Repository } from "typeorm";
//
import IPassRecoveryTokenRepository from "@modules/users/repositories/IPassRecoveryTokenRepository";
import PassRecoveryToken from "../entities/PassRecoveryToken";

export default class PassRecoveryTokenRepository
  implements IPassRecoveryTokenRepository {
  private ormRepo: Repository<PassRecoveryToken>;

  constructor() {
    this.ormRepo = getRepository(PassRecoveryToken);
  }

  public async findById(id: string): Promise<PassRecoveryToken | undefined> {
    return await this.ormRepo.findOne(id);
  }

  public async generate(userId: string): Promise<PassRecoveryToken> {
    const passToken = this.ormRepo.create({
      userId,
    });
    await this.ormRepo.save(passToken);
    return passToken;
  }
}
