export default interface IHashProvider {
  save(file: string): Promise<string>;
  delete(file: string): Promise<void>;
}
