import Event from "../infra/typeorm/entities/Event";
import ICreateEventDTO from "../dtos/ICreateEventDTO";

// This interface works as a "guideline" for all the methods the events repo
// needs. It shouldn't matter how it is implemented on the actual repo, nor
// if it is SQL or NoSQL and etc, but it should have the methods below
export default interface IEventsRepository {
  create(data: ICreateEventDTO): Promise<Event>;
  findByDate(date: Date, calendarId: string): Promise<Event | undefined>;
}
