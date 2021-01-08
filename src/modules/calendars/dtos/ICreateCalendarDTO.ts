import User from "@modules/users/infra/typeorm/entities/User"

export default interface ICreateCalendarDTO {
  user: User;
  name: string;
}
