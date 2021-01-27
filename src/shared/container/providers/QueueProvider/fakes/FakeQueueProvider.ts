import IQueueProvider from "../models/IQueueProvider";

export default class FakeQueueProvider implements IQueueProvider {
  public add(name: string, data?: any): void {}
  public process(): void {}
}
