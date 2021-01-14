import Tech from "@modules/techs/infra/typeorm/entities/Tech";

export default interface IUpdateClassDTO {
  id: string;
  date: Date;
  description: string;
  techs: Tech[];
}
