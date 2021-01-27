import { v4 as uuidv4 } from "uuid";
//
import IPassRecoveryTokenRepository from "@modules/users/repositories/IPassRecoveryTokenRepository";
import PassRecoveryToken from "../../infra/typeorm/entities/PassRecoveryToken";

export default class FakePassRecoveryTokenRepository
  implements IPassRecoveryTokenRepository {
  private passRecoveryTokens: PassRecoveryToken[] = [];

  public async generate(userId: string): Promise<PassRecoveryToken> {
    const passRecoveryToken = new PassRecoveryToken();

    const time = new Date();

    Object.assign(passRecoveryToken, {
      id: uuidv4(),
      userId,
      createdAt: time,
      updatedAt: time,
    });

    this.passRecoveryTokens.push(passRecoveryToken);
    return passRecoveryToken;
  }
  public async findById(
    tokenId: string
  ): Promise<PassRecoveryToken | undefined> {
    const foundToken = this.passRecoveryTokens.find(
      token => token.id === tokenId
    );
    return foundToken;
  }
  public async delete(tokenId: string): Promise<void> {
    this.passRecoveryTokens = this.passRecoveryTokens.filter(
      token => token.id !== tokenId
    );
  }
}
