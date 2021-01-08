import IHashProvider from "../models/IHashProvider";

export default class BCrypt implements IHashProvider {
  // On tests there is no need to hash the passwd
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }
  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}
