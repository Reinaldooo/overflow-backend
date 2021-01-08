import Calendar from "../infra/typeorm/entities/Calendar";
import ICreateCalendarDTO from "../dtos/ICreateCalendarDTO";

// This interface works as a "guideline" for all the methods the calendars repo
// needs. It shouldn't matter how it is implemented on the actual repo, nor
// if it is SQL or NoSQL and etc, but it should have the methods below
export default interface ICalendarsRepository {
  create(data: ICreateCalendarDTO): Promise<Calendar>;
  findByDate(date: Date): Promise<Calendar | undefined>;
}
