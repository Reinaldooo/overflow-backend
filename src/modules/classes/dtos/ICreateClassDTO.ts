import Tech from "@modules/techs/infra/typeorm/entities/Tech";

export default interface ICreateClassDTO {
  tutorId: string;
  date: Date;
  description: string;
  techs: Tech[];
}
