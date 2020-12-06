import { v4 as uuidv4 } from "uuid";
//
import IPassRecoveryTokenRepository from "@modules/users/repositories/IPassRecoveryTokenRepository";
import PassRecoveryToken from "../../infra/typeorm/entities/PassRecoveryToken";

export default class FakePassRecoveryTokenRepository
  implements IPassRecoveryTokenRepository {
  private passRecoveryTokens: PassRecoveryToken[] = [];

  public async generate(userId: string): Promise<PassRecoveryToken> {
    const passRecoveryToken = new PassRecoveryToken();

    Object.assign(passRecoveryToken, {
      id: uuidv4(),
      userId,
    });

    this.passRecoveryTokens.push(passRecoveryToken);
    return passRecoveryToken;
  }
}
