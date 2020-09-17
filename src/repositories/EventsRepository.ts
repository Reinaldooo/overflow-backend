import { EntityRepository, Repository } from "typeorm";
//
import Event from "../models/Event";

@EntityRepository(Event)
// This decorator creates a new repo based on the old one and add the new
// methods i need
export default class EventRepository extends Repository<Event> {
  // The new repo extends the functions of the old one while including the new
  // methods
  public async findByDate(date: Date): Promise<Event | null> {
    const event = await this.findOne({
      where: { date },
    });
    return event || null;
  }
}
