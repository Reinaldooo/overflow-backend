export default interface IQueueProvider {
  add(name: string, data?: any): void;
  process(): void;
}
