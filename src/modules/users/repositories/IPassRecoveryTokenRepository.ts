import PassRecoveryToken from "../infra/typeorm/entities/PassRecoveryToken";

export default interface IPassRecoveryTokenRepository {
  generate(userId: string): Promise<PassRecoveryToken>;
  findById(tokenId: string): Promise<PassRecoveryToken | undefined>;
  delete(id: string): Promise<void>;
}
