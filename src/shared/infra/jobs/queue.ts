import "reflect-metadata";
import { container } from "tsyringe";
//
import "../../container/providers/QueueProvider";
import Queue from "../../container/providers/QueueProvider/implementations/BullQueueProvider";

const queue = container.resolve<Queue>("QueueProvider");
queue.process();
queue.add("UpdateRanks");
