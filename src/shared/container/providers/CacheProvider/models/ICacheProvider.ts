export default interface ICacheProvider {
  save(key: string, value: string | number): Promise<void>;
  get(key: string): Promise<string | undefined>;
  invalidade(key: string): Promise<void>;
}
