import Tech from "@modules/techs/infra/typeorm/entities/Tech";
import User from "@modules/users/infra/typeorm/entities/User";

export default interface ICreateClassDTO {
  tutor: User;
  date: Date;
  description: string;
  techs: Tech[];
}
