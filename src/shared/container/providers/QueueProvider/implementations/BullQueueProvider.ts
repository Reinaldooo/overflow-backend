import Queue from "bull";
//
import IQueueProvider from "../models/IQueueProvider";
import updateRanksCache from "@modules/classes/infra/jobs/updateRanksCache";

const jobs = [updateRanksCache];

export default class BullQueueProvider implements IQueueProvider {
  queues: any = [];

  constructor() {
    this.init();
  }

  init() {
    this.queues = jobs.map(job => ({
      bull: new Queue(job.key, { redis: { host: "localhost", port: 2453 } }),
      name: job.key,
      handle: job.handle,
      options: job.options,
    }));
  }

  add(name: string, data?: any): void {
    const queue = this.queues.find(queue => queue.name === name);

    return queue.bull.add(data, queue.options);
  }
  process(): void {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle);

      queue.bull.on("failed", (job, err) => {
        throw new Error(`Queue job failed: ${queue.key}-${err}`);
      });
    });
  }
}
